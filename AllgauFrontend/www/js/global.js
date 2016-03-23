var SERVER_ADDRESS = "192.168.1.31";
var SERVER_PORT = "9090";
var SERVER_APPLICATION = "AllgauBackend";

var SPLASH_PAGE_CODE = "splash";
var LOGIN_PAGE_CODE = "login";
var APP_PAGE_CODE = "app";

var enableSavingUser = true;
var USER_STORAGE_KEY = "user";


var DEFAULT_BOOK_IMG = "../res/img/default_book.png";


function User(userName, login, img){
   this.userName = userName;
   this.login = login;
   this.img = img;
}


function gotoPage(pageCode){
   switch (pageCode) {
      case SPLASH_PAGE_CODE:
         window.open("../html/splash.html", "_self");
         break;
      case LOGIN_PAGE_CODE:
         window.open("../html/login.html", "_self");
         break;
      case APP_PAGE_CODE:
         window.open("../html/app.html", "_self");
         break;
   }
}
