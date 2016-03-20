


function loadProductViewSection(){
   var img              = $("#productViewSection_img");
   var idOut            = $("#productViewSection_idOut");
   var labelOut         = $("#productViewSection_labelOut");
   var descriptionOut   = $("#productViewSection_descriptionOut");
   var priceOut         = $("#productViewSection_priceOut");
   var quantityOut      = $("#productViewSection_quantityOut");
   var dateOut          = $("#productViewSection_dateOut");


   // *Sending the http request:
   $.ajax({
      method: "POST",
      url: "http://" + SERVER_ADDRESS + ":" + SERVER_PORT + "/" + SERVER_APPLICATION +
         "/productView",
      data: {id: getId()}
   }).done(function(responseJson_str){

      // *Converting the response string to JSON:
      product = JSON.parse(responseJson_str);

      img.attr("src", default_book_img);
      idOut.text("#" + product.id);
      labelOut.text(product.label);
      descriptionOut.text(product.description);
      priceOut.text(product.price + " USD");
      quantityOut.text(product.quantity);
      dateOut.text(product.date);

   }).fail(function(jqXHR, textStatus, errorThrown){
      console.log("Loading failed: Can't reach server");
   });
}


function getId(){
   return getQueryString("productId");
}
