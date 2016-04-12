
var inSelectionMode;
var cartBtn;
var CART_STORAGE_CODE = "cart";

var cart;


function IdQuantityStruct(id, quantity){
   this.id = id;
   this.quantity = quantity;
}

function Cart(idQuantityArray){
   this.idQuantityArray = idQuantityArray===null || idQuantityArray===undefined ? []:idQuantityArray;

   // Returns true if it added the id on cart:
   this.addOnProduct = function(id){
      for(var i=0; i<this.idQuantityArray.length; i++){
         if(this.idQuantityArray[i].id == id){
            this.idQuantityArray[i].quantity++;
            return false;
         }
      }

      this.idQuantityArray.push(new IdQuantityStruct(id, 1));
      return true;
   };

   // @Deprecated
   // Returns true if it removed the id from cart:
   this.removeOnProduct = function(id){
      for(var i=0; i<this.idQuantityArray.length; i++){
         if(this.idQuantityArray[i].id == id){
            this.idQuantityArray[i].quantity--;
            if(this.idQuantityArray[i].quantity <= 0){
               this.removeProduct(id);
               return true;
            } else{
               return false;
            }
         }
      }
      return false;
   };


   this.removeProduct = function(id){
      for(var i=0; i<this.idQuantityArray.length; i++){
         if(this.idQuantityArray[i].id == id){
            this.idQuantityArray.splice(i, 1);
         }
      }
   };


   this.getQuantity = function(id){
      for(var i=0; i<this.idQuantityArray.length; i++){
         if(this.idQuantityArray[i].id == id){
            return this.idQuantityArray[i].quantity;
         }
      }
      return 0;
   };


   this.serialize = function(){
      return JSON.stringify(this.idQuantityArray);
   };
}

Cart.deserialize = function(idQuantityArray_str){
   return idQuantityArray_str===null ? new Cart():new Cart(JSON.parse(idQuantityArray_str));
};



/**
 * Retrieves a DOM <li> element that represents the given product.
 */
function getProductListItem(product){
   var listItem =
   $("<li/>")
         .addClass("row")
         .attr("data-id", product.id);

      var image_column =
      $("<div/>")
         .addClass("productImgContainer")
         .addClass("horizontal")
         .appendTo(listItem);

         $("<img/>")
            .addClass("circledImg")
            .attr("src", DEFAULT_BOOK_IMG)
            .appendTo(image_column);


      var info_column =
      $("<div/>")
         .addClass("horizontal")
         .appendTo(listItem);

         var title_line =
         $("<span/>")
            .addClass("vertical")
            .addClass("title")
            .text(product.label)
            .appendTo(info_column);

            $("<i/>")
               .addClass("material-icons")
               .text("drafts")
               .appendTo(title_line);

            $("<span/>")
               .addClass("quantityInStockOut")
               .text(product.quantity)
               .appendTo(title_line);

         $("<span/>")
            .addClass("vertical")
            .text(product.description)
            .appendTo(info_column);

      var cart_column =
      $("<div/>")
         .addClass("horizontal")
         .addClass("cartQuantityContainer")
         .appendTo(listItem);

         $("<span/>")
            .addClass("cartQuantityOut")
            .appendTo(cart_column);


      $("<paper-ripple/>")
         .attr("fit", true)
         .appendTo(listItem);

   return listItem;
}




function loadStorageSection(){
   $.event.special.tap.emitTapOnTaphold = false;

   cartBtn = $("#cartBtn");
   var list = $("#storage_sectionList");
   list.empty();
   enableSelectionMode(false);

   cartBtn
   .bind("tap", function(e){
      // *Goes to cart section:
      goToHash("#cart");
   })
   .bind("taphold", function(e){
      // *Enables the selection mode:
      enableSelectionMode(!inSelectionMode);
   });




   var clickListener = function(e){
      var id = $(e.currentTarget).attr("data-id");

      if(!inSelectionMode){
         // *If it is in normal mode:
         goToHash("#productView", "?productId=" + id);
      } else{
         // *If it is in selection mode:
         var quantity = $(e.currentTarget).find(".quantityInStockOut").text();
         if(quantity > cart.getQuantity(id)){
            addOnCart(id);
         } else{
            // *Not enought at stock to add on cart:
            // TODO
         }

      }
   };

   var longClickListener = function(e){
      if(inSelectionMode){
         // *If it is in selection mode:
         var id = $(e.currentTarget).attr("data-id");
         removeFromCart(id);
      }
   };

   new AllgauRequest(
      "productList",
      "POST",
      null,
      stub_storageSection_loadProducts(6)) //TODO STUB
      .done(function(response){

         for(var i=0; i<response.length; i++){
            var product = response[i];

            var itemList = getProductListItem(product);
            itemList.appendTo(list);
         }

         loadCart();

         $("#storage_sectionList .row")
            .bind("tap", clickListener)
            .bind("taphold", longClickListener);
      })
      .fail(function(jqXHR, textStatus, errorThrown){
         console.log("Loading failed: Can't reach server");
      });
}




function enableSelectionMode(enable){
   inSelectionMode = enable;
   $("#storage_sectionList").css("background", enable?"rgba(0, 0, 0, 0.15)":"none");
   console.log("Selection mode: " + enable);
}


function loadCart(){
   cart = Cart.deserialize(sessionStorage.getItem(CART_STORAGE_CODE));

   var prodAndQuantOnCart = cart.idQuantityArray;
   for(var i=0; i<prodAndQuantOnCart.length; i++){
      styleRowAsSelected(prodAndQuantOnCart[i].id, prodAndQuantOnCart[i].quantity);
   }
}



function addOnCart(id){
   var productAdded = cart.addOnProduct(id);
   sessionStorage.setItem(CART_STORAGE_CODE, cart.serialize());
   styleRowAsSelected(id, cart.getQuantity(id));
}

function removeFromCart(id){
   cart.removeProduct(id);
   sessionStorage.setItem(CART_STORAGE_CODE, cart.serialize());
   unstyleRow(id);
}




function styleRowAsSelected(id, quantityInCart){
   var row = $("#storage_sectionList > .row[data-id=" + id + "]");
   var container = row.children(".cartQuantityContainer");

   container.show();
   container.children(".cartQuantityOut").text(quantityInCart);

}

function unstyleRow(id){
   var row = $("#storage_sectionList > .row[data-id=" + id + "]");
   var container = row.children(".cartQuantityContainer");

   container.hide();
   container.children(".cartQuantityOut").text("");
}
