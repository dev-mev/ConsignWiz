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