
var cart;

function loadCartSection(){
   var list = $("#cartSection_productList");
   list.empty();

   // *Retrieving the cart object from storage:
   cart = Cart.deserialize(sessionStorage.getItem(CART_STORAGE_CODE));

   // *Getting the cart's ids for its products:
   var idQuantityArray = cart.idQuantityArray;
   var idArray = [];
   for(var i=0; i<idQuantityArray.length; i++){
      idArray.push(idQuantityArray[i].id);
   }


   // *Sending the http request:
   new AllgauRequest(
      "cartView",
      "POST",
      {idArray: JSON.stringify(idArray)},
      stub_storageSection_loadProducts(6)) //TODO STUB
      .done(function(response){
         // *Returned the products info:

         for(var i=0; i<response.length; i++){
            var product = response[i];

            var itemList = getProductListItem(product);
            var container = itemList.children(".cartQuantityContainer");
            container.show();
            for(var j=0; j<idQuantityArray.length; j++){
               if(product.id == idQuantityArray[j].id){
                  container.children(".cartQuantityOut").text(idQuantityArray[j].quantity);
                  break;
               }
            }

            itemList.appendTo(list);
         }
      })
      .fail(function(jqXHR, textStatus, errorThrown){
         console.log("Loading failed: Can't reach server");
      });
}



function cartSection_deleteBtn_onClick(){
   // TODO
}
