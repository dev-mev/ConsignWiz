//console.log("KO initiated");

function Studio() {
  this.ModalStatus = ko.observable("sale");
  this.MakeASale = ko.observable(true);

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
  return;
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
            //console.log("inventory sold date is null");
            //then item has not sold
            itemStatus = "Sold";
            
          } else {
            //console.log("inventory sold date is NOT null");
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
       for (var i = 0; i < users.length; i++){
         if (users[i].userType === "consignor") {
            $(".employee").addClass("hide");
            console.log("CONSIGNOR");
            //ModalStatus change to "view consignment"
         }
         else if (users[i].userType === "employee") {
           console.log("EMPLOYEE");
           $(".consignor").addClass("hide");
         }
         else {
           console.log("Cannot get userType");
         }
       }
    });
  }
  discoverUserType();
});


$(".submit").on("click", function(event) {
  event.preventDefault();

  // Here we grab the form elements
  var searchuser = {
    firstName: $("#firstName").val().trim(),
  };

  console.log(searchuser);

  $.post("/api/inventory_users", searchuser,
    function(data) {
      console.log("data: ", data);

      // If a table is available... tell user they are booked.
      if (data) {
        alert("We have inventory!");
      }

      // If a table is available... tell user they on the waiting list.
      else {
        alert("Sorry we dont have inventory for this user");
      }

      // Clear the form when submitting
      $("#firstName").val("");
    });
});

ko.applyBindings(new Studio());
