var db = require("../models");
var LocalStrategy = require("passport-local").Strategy;
var bcrypt = require("bcrypt");
var passport = require("passport");
var session = require("express-session");
var express = require("express");
require("dotenv").config();

module.exports = function(app) {
  // Passport
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  app.use(express.static("public")); //all static files, look inside the public  folder

  app.use(session({ secret: process.env.secret }));
  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(
    new LocalStrategy(function(username, passwordEntered, done) {
      db.users
        .findOne({
          where: {
            username: username
          }
        })
        .then(function(userData) {
          bcrypt.compare(
            passwordEntered,
            userData.get("passwordHashSalt"),
            function(_, isMatch) {
              if (isMatch) {
                return done(null, {
                  username: userData.get("username"),
                  type: userData.get("userType"),
                  id: userData.get("id")
                });
              } else {
                return done(null, false);
              }
            }
          );
        });
    })
  );

  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(user, done) {
    done(null, user);
  });

  function verifyUserType(requiredType) {
    return function(req, res, next) {
      if (req.user.type === requiredType) {
        next();
      } else {
        res.sendStatus(401);
      }
    };
  }

  app.post(
    "/login",
    passport.authenticate("local", { failureRedirect: "/login.html" }),
    function(req, res) {
      res.redirect("/index.html");
    }
  );

  //Logout route
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/login.html");
  });

  function isUserAuthenticated(req, res, next) {
    if (req.user) {
      next();
    } else {
      res.sendStatus(401);
    }
  }

  // Get all inventory with Users
  app.get(
    "/api/inventory_users",
    [isUserAuthenticated, verifyUserType("employee")],
    function(req, res) {
      db.inventory
        .findAll({ include: [db.users] })
        .then(function(dbInvPlusUser) {
          res.json(dbInvPlusUser);
        });
    }
  );

  // get all inventory for one consignor
  app.get(
    "/api/inventory",
    [isUserAuthenticated, verifyUserType("consignor")],
    function(req, res) {
      db.inventory
        .findAll({ where: { userId: req.user.id } })
        .then(function(dbInventory) {
          res.json(dbInventory);
        });
    }
  );

  // TODO: for testing purposes
  app.get("/secret", isUserAuthenticated, function(req, res) {
    res.send("Page to test authentication.");
    console.log(
      "secret route accessed by " + req.user.username + " " + req.user.type
    );
  });

  app.get("*", function(req, res) {
    res.render("404");
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
