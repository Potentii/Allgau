var personImg;
var welcomeOut;
var loginIn;
var passwordIn;
var confirmBtn;
var loginForm;


$(document).ready(function(){
   personImg   = $("#login_personImg");
   welcomeOut  = $("#login_welcomeOut");
   loginIn     = $("#login_loginIn");
   passwordIn  = $("#login_passwordIn");
   confirmBtn  = $("#login_confirmBtn");
   loginForm   = $("#login_section > form");


   // *Fixing a bug with mobile webviews and :active state:
   document.addEventListener("touchstart", function(){}, true);


   fadeWelcomeMessage(false, 0);
   fadeForm(true, 0);
   expandUserImg(false, 0);


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


            // *Creating an User instance:
            var user = new User(
               responseJson.name,
               responseJson.login,
               "../res/img/user.png"
            );


            // *Saving user's info:
            if(enableSavingUser){
               localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
            }
            sessionStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));


            // *Displaying the welcome message:
            personImg.attr("src", user.img);
            welcomeOut.text("Welcome, " + user.userName);
            fadeForm(false, 400);
            fadeWelcomeMessage(true, 700);
            expandUserImg(true, 700);


            // *Exiting login section:
            window.setTimeout(function(){
               gotoPage(APP_PAGE_CODE);
            }, 3000);

         } else{
            localStorage.removeItem(USER_STORAGE_KEY);
            console.log("Login failed: " + responseJson.err);
            alert("Login failed: " + responseJson.err);
         }

      }).fail(function(jqXHR, textStatus, errorThrown){
         console.log("Login failed: Can't reach server");
         alert("Login failed: Can't reach server");
      });
   });
});

/**
 * Hides or shows the form's inputs.
 */
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

/**
 * Hides or shows the welcome message.
 */
function fadeWelcomeMessage(fadeIn, time){
   if(fadeIn){
      welcomeOut.animate({fontSize:'2em', opacity:'1'}, time);
   } else{
      welcomeOut.animate({fontSize:'0.5em', opacity:'0'}, time);
   }
}

/**
 * Expands or contracts the user image.
 */
function expandUserImg(expand, time){
   if(expand){
      personImg.animate({width: '5em', height: '5em'}, time);
   } else{
      personImg.animate({width: '4em', height: '4em'}, time);
   }
}
