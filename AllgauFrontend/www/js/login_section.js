var personImg;
var welcomeOut;
var loginIn;
var passwordIn;
var confirmBtn;
var loginForm;
var loginForm;




$(document).ready(function(){
   // *Updating login info on drawer:
   updateDrawerUserInfo();
});

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

   personImg.attr("src", default_person_img);


   // *Adding form's submit listener:
   loginForm.submit(function(event){
      // *Preventing page to reload on submit:
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

            // *Updating user's info:
            user_id = responseJson.login;
            user_name = responseJson.name;
            user_img = "../res/img/user.png";

            // *Saving user's info:
            if(saveUser_session){
               sessionStorage.setItem("user_id", user_id);
               sessionStorage.setItem("user_name", user_name);
               sessionStorage.setItem("user_img", user_img);
            }

            // *Updating user's info on drawer:
            updateDrawerUserInfo();

            // *Displaying the welcome message:
            welcomeOut.text("Welcome, " + user_name);
            fadeForm(false, 400);
            fadeWelcomeMessage(true, 700);
            expandPersonImg(true, 700);

            // *Exiting login section:
            window.setTimeout(function(){
               goToHash("#profile");
            }, 3000);

         } else{
            user_id = null;
            user_name = null;
            user_img = null;
            console.log("Login failed: " + responseJson.err);
            updateDrawerUserInfo();
         }

      }).fail(function(jqXHR, textStatus, errorThrown){
         user_id = null;
         user_name = null;
         user_img = null;
         console.log("Login failed: Can't reach server");
         updateDrawerUserInfo();
      });
   });
}


function updateDrawerUserInfo(){
   var name = user_id === null ? "Log in":user_name;
   var img = user_id === null ? default_person_img:user_img;

   // *Setting up user's name:
   $('#drawerLoginBtn > span').text(name);

   // *Setting up user's image:
   $('#drawerLoginBtn > img').attr("src", img);
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
