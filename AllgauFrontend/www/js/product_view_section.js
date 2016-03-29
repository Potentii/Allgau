function loadProductViewSection(){
   var img              = $("#productViewSection_img");
   var idOut            = $("#productViewSection_idOut");
   var labelOut         = $("#productViewSection_labelOut");
   var descriptionOut   = $("#productViewSection_descriptionOut");
   var priceOut         = $("#productViewSection_priceOut");
   var quantityOut      = $("#productViewSection_quantityOut");
   var dateOut          = $("#productViewSection_dateOut");


   // *Sending the http request:
   new AllgauRequest(
      "productView",
      "POST",
      {id: getId()},
      stub_productViewSection_loadProduct(getId())) //TODO STUB
      .done(function(product){
         img.attr("src", DEFAULT_BOOK_IMG);
         idOut.text("#" + product.id);
         labelOut.text(product.label);
         descriptionOut.text(product.description);
         priceOut.text(product.price + " USD");
         quantityOut.text(product.quantity);
         dateOut.text(product.date);
      })
      .fail(function(jqXHR, textStatus, errorThrown){
         console.log("Loading failed: Can't reach server");
      });
}


function getId(){
   return getQueryString("productId");
}

function productViewSection_deleteBtn_onClick(){
   // TODO
}
