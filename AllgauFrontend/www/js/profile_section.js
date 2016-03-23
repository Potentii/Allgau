function loadProfileSection(){
   var personImg  = $("#profileSection_personImg");
   var personName = $("#profileSection_personName");
   var loginOut   = $("#profileSection_loginOut");


   // *Sending the http request:
   $.ajax({
      method: "POST",
      url: "http://" + SERVER_ADDRESS + ":" + SERVER_PORT + "/" + SERVER_APPLICATION +
         "/profile",
      data: {login: user.login}
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
   sessionStorage.removeItem(USER_STORAGE_KEY);
   localStorage.removeItem(USER_STORAGE_KEY);

   gotoPage(LOGIN_PAGE_CODE);
}
