// TODO implement the remaining stub responses

function stub_storageSection_loadProducts(quantity){
   var prodList = [];
   for(var i=0; i<quantity; i++){
      prodList.push({
         id: i+1,
         label: "label placeholder",
         description: "description placeholder",
         price: 120.50,
         quantity: 4
      });
   }

   return prodList;
}



function stub_productViewSection_loadProduct(id){
   return {
      id: id,
      label: "label placeholder",
      description: "description placeholder",
      price: 120.50,
      quantity: 4
   };
}
