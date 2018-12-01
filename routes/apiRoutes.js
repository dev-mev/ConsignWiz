var db = require("../models");

module.exports = function(app) {
  // Get all inventory with Users
  app.get("/api/inventory_users", function(req, res) {
    db.inventory.findAll({ include: [db.users] }).then(function(dbInvPlusUser) {
      res.json(dbInvPlusUser);
    });
  });

  // get all inventory for one consignor
  app.get("/api/inventory/:userId", function(req, res) {
    db.inventory
      .findAll({ where: { id: req.params.userId } })
      .then(function(dbInventory) {
        res.json(dbInventory);
      });
  });

  // // Get all examples
  // app.get("/api/examples", function(req, res) {
  //   db.Example.findAll({}).then(function(dbExamples) {
  //     res.json(dbExamples);
  //   });
  // });

  // Create a new example
  // app.post("/api/examples", function(req, res) {
  //   db.Example.create(req.body).then(function(dbExample) {
  //     res.json(dbExample);
  //   });
  // });

  // Delete an example by id
  // app.delete("/api/examples/:id", function(req, res) {
  //   db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
  //     res.json(dbExample);
  //   });
  // });
};
