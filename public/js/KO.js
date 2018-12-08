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

  // Consignment status
  function runInventoryQuery() {
    var amountOwed = 0;
    $.ajax({ url: "/api/my-items", method: "GET" }).then(function(inventory) {
      if (inventory.length === 0) {
        // console.log("No inventory items");
      } else {
        // Loop through and display each of the inventory items
        for (var i = 0; i < inventory.length; i++) {
          var consignmentList = $("#consignment-list");
          var listItem = $("<li class='list-group-item mt-4'>");
          var itemStatus = "";
          amountOwed +=
            inventory[i].sold_at_price * inventory[i].commission_rate;

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
        $("#amount-owed").text("We owe you: $" + amountOwed.toFixed(2));
      }
    });
  }

  // function discoverUserType() {
  //   // console.log("begin discoverUserType function");
  //   $.ajax({ url: "/api/users", method: "GET" }).then(function(users) {
  //     console.log("begin loop in discoverUserType");
  //     for (var i = 0; i < users.length; i++) {
  //       if (users[i].userType === "consignor") {
  //         window.myStudio.ModalStatus("consignment-status");
  //         console.log(window.myStudio.ModalStatus());
  //         console.log("CONSIGNOR");
  //       } else if (users[i].userType === "employee") {
  //         console.log("EMPLOYEE");
  //       } else {
  //         console.log("Cannot get userType");
  //       }
  //     }
  //   });
  // }

  //consignor lookup submit
  $(".submit").on("click", function(event) {
    event.preventDefault();

    var searchuser = {
      firstName: $("#firstName")
        .val()
        .trim()
        .toLowerCase()
    };

    $.ajax({ url: "/api/users", method: "GET" }).then(function(data) {
      //console.log("data: ", data);
      //console.log("searchuser", searchuser.firstName);
      for (var i = 0; i < data.length; i++) {
        //console.log(data);
        if (data[i].first_name === searchuser.firstName) {
          $("#consignor-results").empty();
          var consignorResults = $("#consignor-results");
          var listItem1 = $("<li class='list-group-item mt-4'>");
          //clear contents .db
          listItem1.append(
            $("<span class='bold underline'>").text("First name: "),
            $("<span class='db underline'>").text(data[i].first_name),
            $("<br>"),
            $("<span class='bold underline'>").text("Last name: "),
            $("<span class='db underline'>").text(data[i].last_name),
            $("<br>"),
            $("<span class='bold underline'>").text("Street address "),
            $("<span class='db underline'>").text(data[i].street_address1),
            $("<br>"),
            $("<span class='bold'>").text("City: "),
            $("<span class='db'>").text(data[i].city),
            $("<br>"),
            $("<span class='bold'>").text("Email: "),
            $("<span class='db'>").text(data[i].email_address),
            $("<br>"),
            $("<span class='bold'>").text("Phone: "),
            $("<span class='db'>").text(data[i].phone1),
            $("<br>")
          );
          consignorResults.append(listItem1);
        }
      }
    });
  });

  // Inventory lookup
  $("#inventoryLookupForm").on("submit", function(event) {
    event.preventDefault();

    var searchItem = {
      productName: $("#inventorySearchProductName")
        .val()
        .trim()
    };

    $.ajax({
      url: "/api/inventory/" + encodeURIComponent(searchItem.productName),
      method: "GET"
    }).then(function(data) {
      var inventoryResults = $("#inventory-results").empty();
      for (var i = 0; i < data.length; i++) {
        var listItem1 = $("<li class='list-group-item mt-4'>");

        listItem1.append(
          $("<span class='bold'>").text("Item ID: "),
          $("<span class='db'>").text(data[i].id),
          $("<br>"),
          $("<span class='bold underline'>").text("Product name: "),
          $("<span class='db underline'>").text(data[i].product_name),
          $("<br>"),
          $("<span class='bold underline'>").text("Description "),
          $("<span class='db underline'>").text(data[i].description),
          $("<br>"),
          $("<span class='bold'>").text("Price: "),
          $("<span class='db'>").text(data[i].requested_sale_price),
          $("<br>"),
          $("<span class='bold underline'>").text("Sold for: "),
          $("<span class='db underline'>").text(data[i].sold_at_price),
          $("<br>"),
          $("<span class='bold underline'>").text("Consignor ID: "),
          $("<span class='db underline'>").text(data[i].userId),
          $("<br>")
        );
        inventoryResults.append(listItem1);
      }
    });
  });

  // show/hide buttons based on userType
  $.ajax({
    url: "/api/users/me",
    method: "GET"
  }).then(function(user) {
    $("." + user.type).show();
  });

  // Make a sale submit // ERE20181207 - This is a PUT Action
  $("#make-sale").on("submit", function(event) {
    event.preventDefault();
    console.log("make a sale submit <=======+++++++=======<");
    var intSoldAtPrice = $("#makeSaleSoldAtPrice")
      .val()
      .trim();
    var soldDate = $("#makeSaleItemSoldDate")
      .val()
      .trim();
    var intInventoryId = $("#makeSaleId")
      .val()
      .trim();
    if (intSoldAtPrice && soldDate && intInventoryId) {
      var updateItem = {
        // eslint-disable-next-line camelcase
        soldAtPrice: intSoldAtPrice,
        // eslint-disable-next-line camelcase
        soldDate: soldDate
      };
      console.log("updateItem", updateItem);
      $.ajax("/api/inventory/" + intInventoryId, {
        type: "PUT",
        data: updateItem
      }).then(function() {
        console.log("changed Sold at Price to", updateItem.soldAtPrice);
        // Reload the page to get the updated list
        $("#make-sale").trigger("reset");
        $("#itemSoldAlert").show();
        setTimeout(function() {
          $("#itemSoldAlert").hide();
        }, 5000);
      });
    } else {
      console.log("empty values in input fields");
    }
  });

  // post inventory
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

  runInventoryQuery();
});
