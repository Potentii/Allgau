var SERVER_ADDRESS = "192.168.1.31";
var SERVER_PORT = "9090";
var SERVER_APPLICATION = "AllgauBackend";

var SPLASH_PAGE_CODE = "splash";
var LOGIN_PAGE_CODE = "login";
var APP_PAGE_CODE = "app";

var enableSavingUser = true;
var USER_STORAGE_KEY = "user";


var DEFAULT_BOOK_IMG = "../res/img/default_book.png";


var TEST_MODE = false;

function User(userName, login, img){
   this.userName = userName;
   this.login = login;
   this.img = img;
}





function DoneResponse(response){
   this.response = response;
}

function FailResponse(jqXHR, textStatus, errorThrown){
   this.jqXHR = jqXHR;
   this.textStatus = textStatus;
   this.errorThrown = errorThrown;
}



function AllgauRequest(servlet, method, data, stubResponse){
   this.doneResponseArray = [];
   this.failResponseArray = [];

   this.doneFunction = null;
   this.failFunction = null;

   this.done = function(f){
      this.doneFunction = f;
      for(var i=0; i<this.doneResponseArray.length; i++){
         this.doneFunction(this.doneResponseArray[i].response);
      }
      this.doneResponseArray = [];

      return this;
   };
   this.fail = function(f){
      this.failFunction = f;
      for(var i=0; i<this.failResponseArray.length; i++){
         this.failFunction(this.failResponseArray[i].jqXHR, this.failResponseArray[i].textStatus, this.failResponseArray[i].errorThrown);
      }
      this.failResponseArray = [];

      return this;
   };



   this.addDoneResponse = function(response){
      if(this.doneFunction !==null){
         this.doneFunction(response);
      } else{
         this.doneResponseArray.push(new DoneResponse(response));
      }
   };
   this.addFailResponse = function(jqXHR, textStatus, errorThrown){
      if(this.failFunction !==null){
         this.failFunction(jqXHR, textStatus, errorThrown);
      } else{
         this.failResponseArray.push(new FailResponse(jqXHR, textStatus, errorThrown));
      }
   };


   if(TEST_MODE){
      this.addDoneResponse(stubResponse);
   } else{
      var that = this;
      $.ajax({
         method: method,
         url: "http://" + SERVER_ADDRESS + ":" + SERVER_PORT + "/" + SERVER_APPLICATION + "/" +
            servlet,
         dataType: "json",
         data: data
      })
      .done(function(response){
         that.addDoneResponse(response);
      })
      .fail(function(jqXHR, textStatus, errorThrown){
         that.addFailResponse(jqXHR, textStatus, errorThrown);
      });
   }
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
