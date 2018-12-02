var session = require("express-session");
var express = require("express");
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var bcrypt = require("bcrypt");
var db = require("../models");

module.exports = function(app) {
  // Middleware
  app.use(session({ secret: "consign" }));
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  app.use(express.static("public")); //all static files, look inside the public  folder

  // Passport
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
                return done(null, userData.get("username"));
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

  app.post(
    "/login",
    passport.authenticate("local", { failureRedirect: "/login.html" }),
    function(req, res) {
      res.redirect("/index.html");
    }
  );

  function isUserAuthenticated(req, res, next) {
    if (req.user) {
      console.log("auth succeeded");
      next();
    } else {
      console.log("login please");
      res.send("You must login!");
    }
  }

  // TODO: for testing purposes
  app.get("/secret", isUserAuthenticated, function(req, res) {
    res.send("Page to test authentication.");
    console.log("secret route accessed by " + req.user);
  });

  //Logout route
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/login.html");
  });

  app.get("*", function(req, res) {
    res.render("404");
  });
};
