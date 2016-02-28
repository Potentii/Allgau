

const SERVER_ADDRESS = "192.168.1.31";
const SERVER_PORT = "9090";
const SERVER_APPLICATION = "AllgauBackend";

var currentSection;


$(document).ready(function(){
   const LOGIN_SECTION = $("#login_section");

   loadLoginSection();
   currentSection = LOGIN_SECTION;


   // *Hiding the drawer on start:
   $("#drawer").animate({width:'toggle'}, 0);


   // *Drawer toggle button
   $("#drawerToggleBtn").click(function(){
      toggleDrawer();
   });

   // *Drawer's buttons
   $("#drawer > button").click(function(){
      toggleDrawer();
   });



   // TODO
   $("#sells_sectionBtn").click(function(){

   });
});









function toggleDrawer(){
   $("#drawer").animate({width: 'toggle'}, 200);
}

//$.support.cors = true;
