var list;

var inSelectionMode;

function loadStorageSection(){
   list = $("#storage_sectionList");
   inSelectionMode = false;


   // *Sending the http request:
   $.ajax({
      method: "POST",
      url: "http://" + SERVER_ADDRESS + ":" + SERVER_PORT + "/" + SERVER_APPLICATION +
         "/productList"
   }).done(function(responseJson_str){

      // *Converting the response string to JSON:
      responseJson = JSON.parse(responseJson_str);

      for(var i=0; i<responseJson.length; i++){
         var product = responseJson[i];

         var listItem = $("<li/>")
               .addClass("row")
               .attr("data-id", product.id)
               .appendTo(list);
         $("<span/>")
            .text(product.label)
            .appendTo(listItem);
         $("<span/>")
            .text(product.description)
            .appendTo(listItem);
         $("<paper-ripple/>")
            .attr("fit", true)
            .appendTo(listItem);
      }


      $("#storage_sectionList .row")
      .click(function(){
         // *On click an item:
         var id = $(this).attr("data-id");
         goToHash("#productView", "?productId=" + id);
      })
      .bind("taphold", function(e){
         // *On long-click an item:
         enableSelectionMode(true);
         alert("long-click: " + $(this).attr('data-id'));
      });

   }).fail(function(jqXHR, textStatus, errorThrown){
      console.log("Loading failed: Can't reach server");
   });
}

function enableSelectionMode(enable){
   inSelectionMode = enable;
   
}
