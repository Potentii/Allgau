var personImg;
var welcomeOut;
var loginIn;
var passwordIn;
var confirmBtn;
var loginForm;
var loginForm;

function loadLoginSection(){
   personImg   = $("#loginSection_personImg");
   welcomeOut  = $("#loginSection_welcomeOut");
   loginIn     = $("#loginSection_loginIn");
   passwordIn  = $("#loginSection_passwordIn");
   confirmBtn  = $("#loginSection_confirmBtn");
   loginForm   = $("#login_section > form");


   fadeWelcomeMessage(false, 0);
   fadeForm(true, 0);
   expandPersonImg(false, 0);


   // *Adding form's submit listener:
   loginForm.submit(function(event){
      // *Preventing from page to reload on submit:
      event.preventDefault();

      // *Sending the http request:
      $.ajax({
         method: "POST",
         url: "http://" + SERVER_ADDRESS + ":" + SERVER_PORT + "/" + SERVER_APPLICATION +
            "/login",
         data: {login: loginIn.val(), password: passwordIn.val()}
      }).done(function(responseJson_str){

         // *Converting the response string to JSON:
         responseJson = JSON.parse(responseJson_str);

         // *Verifying if the user got the authorization:
         if(responseJson.auth){

            // *Displaying the welcome message:
            welcomeOut.text("Welcome, " + responseJson.name);
            fadeForm(false, 400);
            fadeWelcomeMessage(true, 700);
            expandPersonImg(true, 700);

            window.setTimeout(function(){
            }, 3000);

            // TODO exit the login section
         } else{
            console.log("Login failed: " + responseJson.err);
         }

      }).fail(function(jqXHR, textStatus, errorThrown){
         console.log("Login failed: Can't reach server");
      });
   });

}


function fadeForm(fadeIn, time){
   if(fadeIn){
      loginIn.fadeIn(time);
      passwordIn.fadeIn(time);
      confirmBtn.fadeIn(time);
   } else{
      loginIn.fadeOut(time);
      passwordIn.fadeOut(time);
      confirmBtn.fadeOut(time);
   }
}

function fadeWelcomeMessage(fadeIn, time){
   if(fadeIn){
      welcomeOut.animate({fontSize:'2em', opacity:'1'}, time);
   } else{
      welcomeOut.animate({fontSize:'0.5em', opacity:'0'}, time);
   }
}

function expandPersonImg(expand, time){
   if(expand){
      personImg.animate({width: '5em', height: '5em'}, time);
   } else{
      personImg.animate({width: '4em', height: '4em'}, time);
   }
}
