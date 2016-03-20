
var SERVER_ADDRESS = "192.168.1.31";
var SERVER_PORT = "9090";
var SERVER_APPLICATION = "AllgauBackend";

var saveUser_session = true;

var user_id = null;
var user_name = null;
var user_img = null;

var default_person_img = "../res/img/default_person.png";
var default_book_img = "../res/img/default_book.png";

var DEFAULT_SECTION;
var LOGIN_SECTION;
var PROFILE_SECTION;
var STORAGE_SECTION;
var PRODUCT_REG_SECTION;
var PRODUCT_VIEW_SECTION;

var sectionArray;
var currentSection;

var drawer;
var transparencyDiv;
var drawerOpened = true;


$(document).ready(function(){
   // *Fixing a bug with mobile webviews and :active state:
   document.addEventListener("touchstart", function(){}, true);


   drawer = $("#drawer");
   transparencyDiv = $("#transparencyDiv");


   DEFAULT_SECTION      = $("#default_section");
   LOGIN_SECTION        = $("#login_section");
   PROFILE_SECTION      = $("#profile_section");
   STORAGE_SECTION      = $("#storage_section");
   PRODUCT_REG_SECTION  = $("#productReg_section");
   PRODUCT_VIEW_SECTION = $("#productView_section");


   sectionArray = [
      DEFAULT_SECTION,
      LOGIN_SECTION,
      PROFILE_SECTION,
      STORAGE_SECTION,
      PRODUCT_REG_SECTION,
      PRODUCT_VIEW_SECTION
   ];


   // *If not supposed to save user's info, erase it:
   if(!saveUser_session){
      sessionStorage.removeItem("user_id");
      sessionStorage.removeItem("user_name");
      sessionStorage.removeItem("user_img");
   }

   // *Retrieving login info from session:
   user_id     = sessionStorage.getItem("user_id");
   user_name   = sessionStorage.getItem("user_name");
   user_img    = sessionStorage.getItem("user_img");


   // *Loading the current requested hash:
   resolveHash(window.location.hash);


   // *Hiding the drawer on start:
   closeDrawer();


   // *Drawer toggle button:
   $("#drawerToggleBtn").click(function(){
      openDrawer();
   });

   // *Drawer's buttons:
   $("#drawer button").click(function(){
      closeDrawer();
   });

   // *Drawer's transparency:
   transparencyDiv.click(function(){
      closeDrawer();
   });
});



$(window).on('hashchange', function() {
   resolveHash(window.location.hash);
});

function goToHash(hash, queryString){
   queryString = !queryString ? "":queryString;
   window.location.href = window.location.pathname + queryString + hash;
}

function resolveHash(hash){
   // *Only allows not logged users to access login section:
   if(hash !== "#login" && user_id===null){
      goToHash("#login");
      return;
   }

   switch(hash){
   case '#login':
      currentSection = LOGIN_SECTION;
      focusOnCurrentSection();
      loadLoginSection();
      break;
   case '#profile':
      currentSection = PROFILE_SECTION;
      focusOnCurrentSection();
      loadProfileSection();
      break;
   case '#storage':
      currentSection = STORAGE_SECTION;
      focusOnCurrentSection();
      loadStorageSection();
      break;
   case '#productReg':
      currentSection = PRODUCT_REG_SECTION;
      focusOnCurrentSection();
      loadProductRegSection();
      break;
   case '#productView':
      currentSection = PRODUCT_VIEW_SECTION;
      focusOnCurrentSection();
      loadProductViewSection();
      break;

   default:
      // *Default section:
      currentSection = DEFAULT_SECTION;
      focusOnCurrentSection();
      break;
   }
}



/**
* Shows the current section and hides all the others.
*/
function focusOnCurrentSection(){
   focusOnSection(currentSection);
}

/**
* Shows the given section and hides all the others.
*/
function focusOnSection(section){
   for(var i=0; i<sectionArray.length; i++){
      if(section != sectionArray[i]){
         sectionArray[i].hide();
      }
   }
   section.show();
}



/**
* Toggles the side navigation drawer.
*/
function toggleDrawer(){
   if(drawerOpened){
      closeDrawer();
   } else{
      openDrawer();
   }
}
function openDrawer(){
   if(!drawerOpened){
      transparencyDiv.removeClass('transparencyDiv-hided');
      transparencyDiv.addClass('transparencyDiv-showed');

      drawer.removeClass('drawer-closed');
      drawer.addClass('drawer-opened');
      drawerOpened = true;
   }
}
function closeDrawer(){
   if(drawerOpened){
      transparencyDiv.removeClass('transparencyDiv-showed');
      transparencyDiv.addClass('transparencyDiv-hided');

      drawer.removeClass('drawer-opened');
      drawer.addClass('drawer-closed');
      drawerOpened = false;
   }
}


/**
* Retrieves the query's string value for the specified key in the given url.
*/
function getQueryString(key, url) {
   if (!url) url = window.location.href;
   key = key.replace(/[\[\]]/g, "\\$&");
   var regex = new RegExp("[?&]" + key + "(=([^&#]*)|&|#|$)"),
   results = regex.exec(url);
   if (!results) return null;
   if (!results[2]) return '';
   return decodeURIComponent(results[2].replace(/\+/g, " "));
}
