// purchase orders
module.exports = function (sequelize, DataTypes) {
  var purchase_orders = sequelize.define("purchase_orders", {
    related_inventory_Id: DataTypes.INT,
  }, {
    timestamps: false
  });
  return purchase_orders;
};