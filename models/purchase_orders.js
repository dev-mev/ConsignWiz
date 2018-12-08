// purchase orders
module.exports = function (sequelize, DataTypes) {
  var purchase_orders = sequelize.define("purchase_orders", {
    related_inventory_Id: DataTypes.INTEGER,
  }, {
    timestamps: false
  });
  // ERE20181129 - add association
  purchase_orders.associate = function(models) {
    models.purchase_orders.hasMany(models.inventory);
  };
  return purchase_orders;
};