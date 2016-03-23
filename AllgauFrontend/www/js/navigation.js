var user = null;

var DEFAULT_SECTION;
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
   // *Retrieving user's info:
   user = JSON.parse(sessionStorage.getItem(USER_STORAGE_KEY));

   // *Only allows logged users:
   if(user === null){
      gotoPage(SPLASH_PAGE_CODE);
   }

   // *Updating user's info on navigation drawer:
   updateDrawerUserInfo(user);


   // *Fixing a bug with mobile webviews and :active state:
   document.addEventListener("touchstart", function(){}, true);


   drawer = $("#drawer");
   transparencyDiv = $("#transparencyDiv");


   DEFAULT_SECTION      = $("#default_section");
   PROFILE_SECTION      = $("#profile_section");
   STORAGE_SECTION      = $("#storage_section");
   PRODUCT_REG_SECTION  = $("#productReg_section");
   PRODUCT_VIEW_SECTION = $("#productView_section");


   sectionArray = [
      DEFAULT_SECTION,
      PROFILE_SECTION,
      STORAGE_SECTION,
      PRODUCT_REG_SECTION,
      PRODUCT_VIEW_SECTION
   ];




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
   switch(hash){
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
* Updates the user info on navigation drawer.
*/
function updateDrawerUserInfo(user){
   // *Setting up user's image:
   $('#drawerLoginBtn > img').attr("src", user.img);

   // *Setting up user's name:
   $('#drawerLoginBtn > span').text(user.userName);
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
