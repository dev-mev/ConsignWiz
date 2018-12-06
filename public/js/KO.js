//console.log("KO initiated");

function Studio() {
  this.ModalStatus = ko.observable();
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

$(document).ready(function() {
  window.myStudio = new Studio();
  ko.applyBindings(window.myStudio);

  function runInventoryQuery() {
    $.ajax({ url: "/api/inventory", method: "GET" }).then(function(inventory) {
      if (inventory.length === 0) {
        // console.log("No inventory items");
      } else {
        // Loop through and display each of the inventory items
        for (var i = 0; i < inventory.length; i++) {
          var consignmentList = $("#consignment-list");
          var listItem = $("<li class='list-group-item mt-4'>");
          var itemStatus = "";

          if (inventory[i].sold_date) {
            //console.log("inventory sold date is null");
            //then item has not sold
            itemStatus = "Sold";
          } else {
            //console.log("inventory sold date is NOT null");
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

  function discoverUserType() {
    // console.log("begin discoverUserType function");
    $.ajax({ url: "/api/users", method: "GET" }).then(function(users) {
      console.log("begin loop in discoverUserType");
      for (var i = 0; i < users.length; i++) {
        if (users[i].userType === "consignor") {
          window.myStudio.ModalStatus("consignment-status");
          console.log(window.myStudio.ModalStatus());
          console.log("CONSIGNOR");
        } else if (users[i].userType === "employee") {
          console.log("EMPLOYEE");
        } else {
          console.log("Cannot get userType");
        }
      }
    });
  }

  //consignor lookup submit
  $(".submit").on("click", function(event) {
    event.preventDefault();

    var searchuser = {
      firstName: $("#firstName")
        .val()
        .trim()
    };

    $.ajax({ url: "/api/inventory_users", method: "GET" }).then(function(data) {
      console.log("data: ", data);
      console.log("searchuser", searchuser.firstName);
      for (var i = 0; i < data.length; i++) {
        console.log("begin lookup");
        console.log(data[i].user);

        if (data[i].user.first_name === searchuser.firstName) {
          var consignorResults = $("#consignor-results");
          var listItem1 = $("<li class='list-group-item mt-4'>");

          listItem1.append(
            $("<span class='bold underline'>").text("Last name: "),
            $("<span class='db underline'>").text(data[i].user.lastName),
            $("<br>"),
            $("<span class='bold underline'>").text("Street address "),
            $("<span class='db underline'>").text(data[i].user.street_address1),
            $("<br>"),
            $("<span class='bold'>").text("city: "),
            $("<span class='db'>").text(data[i].user.city),
            $("<br>"),
            $("<span class='bold'>").text("email: "),
            $("<span class='db'>").text(data[i].email_address),
            $("<br>")
          );
          consignorResults.append(listItem1);
        }
      }
    });
  });

  runInventoryQuery(); //view consignment status
  //discoverUserType(); //handles which user is logged in.

  // show/hide buttons based on userType
  $.ajax({
    url: "/api/users/me",
    method: "GET"
  }).then(function(user) {
    $("." + user.type).show();
  });

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
