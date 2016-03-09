
var SERVER_ADDRESS = "192.168.1.31";
var SERVER_PORT = "9090";
var SERVER_APPLICATION = "AllgauBackend";

var user_id;
var user_name;

var LOGIN_SECTION;
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


   LOGIN_SECTION = $("#login_section");
   STORAGE_SECTION = $("#storage_section");
   PRODUCT_REG_SECTION = $("#productReg_section");
   PRODUCT_VIEW_SECTION = $("#productView_section");


   sectionArray = [
      LOGIN_SECTION,
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
   case '':
      // *Default section:
      goToHash("#login");
      break;
   case '#login':
      currentSection = LOGIN_SECTION;
      focusOnCurrentSection();
      loadLoginSection();
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
/*
function UpdateQueryString(key, value, url) {
    if (!url) url = window.location.href;
    var re = new RegExp("([?&])" + key + "=.*?(&|#|$)(.*)", "gi"),
        hash;

    if (re.test(url)) {
        if (typeof value !== 'undefined' && value !== null)
            return url.replace(re, '$1' + key + "=" + value + '$2$3');
        else {
            hash = url.split('#');
            url = hash[0].replace(re, '$1$3').replace(/(&|\?)$/, '');
            if (typeof hash[1] !== 'undefined' && hash[1] !== null)
                url += '#' + hash[1];
            return url;
        }
    }
    else {
        if (typeof value !== 'undefined' && value !== null) {
            var separator = url.indexOf('?') !== -1 ? '&' : '?';
            hash = url.split('#');
            url = hash[0] + separator + key + '=' + value;
            if (typeof hash[1] !== 'undefined' && hash[1] !== null)
                url += '#' + hash[1];
            return url;
        }
        else
            return url;
    }
}
*/
