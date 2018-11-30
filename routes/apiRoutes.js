var db = require("../models");

module.exports = function(app) {
  // Get all Users
  app.get("/api/users", function(req, res) {
    db.users.findAll({}).then(function(dbUsers) {
      res.json(dbUsers);
    });
  });

  // Get all inventory
  app.get("/api/inventory", function(req, res) {
    db.inventory.findAll({}).then(function(dbInventories) {
      res.json(dbInventories);
    });
  });

  // Get all inventory with Users
  app.get("/api/inventory_users", function(req, res) {
    db.inventory.findAll({ include: [db.users] }).then(function(dbInvPlusUser) {
      res.json(dbInvPlusUser);
    });
  });

  // Get all users
  app.get("/api/users", function(req, res) {
    db.users.findAll().then(function(dbUsers) {
      res.json(dbUsers);
    });
  });

  // Get all users with logins
  app.get("/api/users_logins", function(req, res) {
    db.users.findAll({ include: [db.logins] }).then(function(dbUsers) {
      res.json(dbUsers);
    });
  });

  // Get a user with login where user email = :email
  app.get("/api/user_login/:email", function(req, res) {
    db.users
      .findAll({ where: { email_address: req.params.email } })
      .then(function(dbUsers) {
        res.json(dbUsers);
      });
  });

  // Get all examples
  app.get("/api/examples", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.json(dbExamples);
    });
  });

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
