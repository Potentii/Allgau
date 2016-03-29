
var cart;

function loadCartSection(){

   cart = Cart.deserialize(sessionStorage.getItem(CART_STORAGE_CODE));

   var idQuantityArray = cart.idQuantityArray;
   var idArray = [];
   for(var i=0; i<idQuantityArray.length; i++){
      idArray.push(idQuantityArray[i].id);
   }
   console.log(idArray);

   // *Sending the http request:
   $.ajax({
      method: "POST",
      url: "http://" + SERVER_ADDRESS + ":" + SERVER_PORT + "/" + SERVER_APPLICATION +
         "/cartView",
      dataType: "json",
      data: {idArray: JSON.stringify(idArray)}
   }).done(function(responseJson){


      for(var i=0; i<responseJson.length; i++){
         var product = responseJson[i];
         console.log("Response[" + i + "]: " + product.label);
         // TODO
      }



   }).fail(function(jqXHR, textStatus, errorThrown){
      console.log("Loading failed: Can't reach server");
   });
}



function cartSection_deleteBtn_onClick(){
   // TODO
}
