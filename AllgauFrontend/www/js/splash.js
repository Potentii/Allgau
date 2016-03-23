$(document).ready(function(){
   if(!enableSavingUser){
      localStorage.removeItem(USER_STORAGE_KEY);
   }

   var user = JSON.parse(localStorage.getItem(USER_STORAGE_KEY));

   if(user !== null){
      // *If logged in:
      sessionStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
      gotoPage(APP_PAGE_CODE);
   } else{
      // *If not:
      gotoPage(LOGIN_PAGE_CODE);
   }
});
