console.log("KO initiated");

function Studio() {
  this.ModalStatus = ko.observable("sale");


  //this.OneVariable = ko.observable("MakeASale");

  this.onclickToggleMakeSale = function(vm) {
    // console.log("vm: ", vm);
    // this.ModalStatus(vm);
    if (this.ModalStatus() !== this.ModalStatus(vm)) {
      this.ModalStatus(vm);
    } else {
      //stay the same
    }
    return;
  };
}



$( document ).ready(function() {

  //View consignment status function
  function runInventoryQuery(currentUser) {
  $.ajax({ url: "/api/inventory", method: "GET" })
    .then(function(inventory) { //inventory might be named something else

      if (inventory.length === 0){
        console.log("No inventory items");
      } else {
        // Loop through and display each of the inventory items
        for (var i = 0; i < inventory.length; i++) {
          var consignmentList = $("#consignment-list");
          var listItem = $("<li class='list-group-item mt-4'>");
          var itemStatus= "";

          if (inventory[i].sold_date){
            console.log("inventory sold date is null");
            //then item has not sold
            itemStatus = "Sold";
            
          } else {
            console.log("inventory sold date is NOT null");
            itemStatus = "Not sold";
            inventory[i].sold_at_price = "TBD"
          }

          listItem.append(
            $("<span class='bold underline'>").text("Item ID "),
            $("<span class='db underline'>").text(inventory[i].id),
            $("<br>"),
            $("<span class='bold'>").text("Sales status: "),
            $("<span class='db'>").text(itemStatus),
            $("<br>"),
            $("<span class='bold'>").text("Item name: "),
            $("<span class='db'>").text(inventory[i].product_name),
            $("<br>"),
            $("<span class='bold'>").text("Description: "),
            $("<span class='db'>").text(inventory[i].description),
            $("<br>"),
            $("<span class='bold'>").text("Price: $"),
            $("<span class='db'>").text(inventory[i].requested_sale_price),
            //stretch goal - momentjs for date item received column
          );

          consignmentList.append(listItem);
        }
      }
    });
  }
  runInventoryQuery();

  //View consignment status function
  function discoverUserType(currentUser) {
  $.ajax({ url: "/api/users", method: "GET" })
    .then(function(users) { 
      console.log("Begin loop");
       for (var i = 0; i < users.length; i++){
         //console.log(users[i].userType);
         if (users[i].userType === "consignor") {
           //hide all but view consignment button
           
         }
         else {
           //show all but consignment button
         }
       }
    });
  }

  discoverUserType();
  

});





ko.applyBindings(new Studio());
