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

ko.applyBindings(new Studio());
