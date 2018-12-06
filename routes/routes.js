/* eslint-disable camelcase */
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

  // Post for adding inventory
  app.post(
    "/api/inventory",
    [isUserAuthenticated, verifyUserType("employee")],
    function(req, res) {
      // eslint-disable-next-line camelcase
      db.inventory.create(req.body).then(function(newItem) {
        res.json(newItem);
      });
    }
  );

  // TODO: [ERE]  The PUT route for updating inventory
  app.put(
    "/api/inventory/:inventoryId",
    // [isUserAuthenticated, verifyUserType("employee")],
    function(req, res) {
      // eslint-disable-next-line camelcase
      db.inventory
        .update(
          {
            // eslint-disable-next-line camelcase
            sold_at_price: req.body.soldAtPrice,
            sold_date: req.body.soldDate
          },
          {
            where: {
              id: req.params.inventoryId
            }
          }
        )
        .then(function(results) {
          res.json(results);
          if (results.changedRows === 0) {
            // If no rows were changed, then the ID must not exist, so 404
            return res.status(404).end();
          } else {
            res.status(200).end();
          }
        });
    }
  );

  // route to get info about logged in user
  app.get("/api/users/me", isUserAuthenticated, function(req, res) {
    res.json(req.user);
  });

  app.get("*", function(req, res) {
    res.render("404");
  });
};
