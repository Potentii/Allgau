var labelIn;
var descriptionIn;
var priceIn;
var quantityIn;


function loadProductRegSection(){
   labelIn        = $("#productRegSection_labelIn");
   descriptionIn  = $("#productRegSection_descriptionIn");
   priceIn        = $("#productRegSection_priceIn");
   quantityIn     = $("#productRegSection_quantityIn");


   $("#productReg_section > form").submit(function(event){
      // *Preventing from page to reload on submit:
      event.preventDefault();

      // *Sending the http request:
      $.ajax({
         method: "POST",
         url: "http://" + SERVER_ADDRESS + ":" + SERVER_PORT + "/" + SERVER_APPLICATION +
            "/productReg",
         data: {
            label: labelIn.val(),
            description: descriptionIn.val(),
            price: priceIn.val(),
            quantity: quantityIn.val()
         }
      }).done(function(responseJson_str){

         // *Converting the response string to JSON:
         responseJson = JSON.parse(responseJson_str);

         goToHash("#productList");

      }).fail(function(jqXHR, textStatus, errorThrown){
         console.log("Query failed: Can't reach server");
      });
   });
}
