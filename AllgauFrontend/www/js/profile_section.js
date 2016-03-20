function loadProfileSection(){
   var personImg  = $("#profileSection_personImg");
   var personName = $("#profileSection_personName");
   var loginOut   = $("#profileSection_loginOut");


   // *Sending the http request:
   $.ajax({
      method: "POST",
      url: "http://" + SERVER_ADDRESS + ":" + SERVER_PORT + "/" + SERVER_APPLICATION +
         "/profile",
      data: {login: user_id}
   }).done(function(responseJson_str){

      // *Converting the response string to JSON:
      employee = JSON.parse(responseJson_str);

      personImg.attr("src", "../res/img/user.png");
      personName.text(employee.name);
      loginOut.text(employee.login);

   }).fail(function(jqXHR, textStatus, errorThrown){
      console.log("Loading failed: Can't reach server");
   });
}


function logOutBtn_onClick(){
   sessionStorage.removeItem("user_id");
   sessionStorage.removeItem("user_name");
   sessionStorage.removeItem("user_img");

   user_id     = null;
   user_name   = null;
   user_img    = null;

   goToHash("#login");
}
