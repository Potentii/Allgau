

$(document).ready(function(){
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
   $("#sells_SectionBtn").click(function(){
      /*
      $("#mainContent").load("login.html", function(){
         
      });
      */
   });
});



function toggleDrawer(){
   $("#drawer").animate({width: 'toggle'}, 200);
}
