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

$(document).ready(function() {
  //View consignment status function
  function runInventoryQuery() {
    $.ajax({ url: "/api/inventory", method: "GET" }).then(function(inventory) {
      if (inventory.length === 0) {
        console.log("No inventory items");
      } else {
        // Loop through and display each of the inventory items
        for (var i = 0; i < inventory.length; i++) {
          var consignmentList = $("#consignment-list");
          var listItem = $("<li class='list-group-item mt-4'>");
          var itemStatus = "";

          if (inventory[i].sold_date) {
            console.log("inventory sold date is null");
            //then item has not sold
            itemStatus = "Sold";
          } else {
            console.log("inventory sold date is NOT null");
            itemStatus = "Not sold";
            // eslint-disable-next-line camelcase
            inventory[i].sold_at_price = "TBD";
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
            $("<span class='db'>").text(inventory[i].requested_sale_price)
            //stretch goal - momentjs for date item received column
          );

          consignmentList.append(listItem);
        }
      }
    });
  }
  runInventoryQuery();

  //View consignment status function - TODO: make this work
  // function discoverUserType(currentUser) {
  //   $.ajax({ url: "/api/users", method: "GET" }).then(function(users) {
  //     console.log("Begin loop");
  //     for (var i = 0; i < users.length; i++){
  //       //console.log(users[i].userType);
  //       if (users[i].userType === "consignor") {
  //         //hide all but view consignment button
  //       } else {
  //         //show all but consignment button
  //       }
  //     }
  //   });
  // }

  //post inventory
  $("#add-inventory-form").on("submit", function(event) {
    event.preventDefault();
    var newItem = {
      userId: $("#userId")
        .val()
        .trim(),
      // eslint-disable-next-line camelcase
      product_name: $("#productName")
        .val()
        .trim(),
      description: $("#description")
        .val()
        .trim(),
      // eslint-disable-next-line camelcase
      received_date: $("#dateReceived")
        .val()
        .trim(),
      // eslint-disable-next-line camelcase
      requested_sale_price: $("#price")
        .val()
        .trim(),
      // eslint-disable-next-line camelcase
      commission_rate: $("#consignorPercent")
        .val()
        .trim()
    };

    // eslint-disable-next-line no-unused-vars
    $.post("/api/inventory", newItem).then(function(data) {
      $("#add-inventory-form").trigger("reset");
      $("#itemAddedAlert").show();
      setTimeout(function() {
        $("#itemAddedAlert").hide();
      }, 5000);
    });
  });
});

ko.applyBindings(new Studio());
