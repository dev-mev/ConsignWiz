var db = require("../models");
var session = require("express-session");
var express = require("express");
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;

module.exports = function(app) {

    // Middleware
    app.use(session({ secret: "consign" }));
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());
    app.use(express.static("public")); //all static files, look inside the public  folder

    // Passport
    app.use(passport.initialize());
    app.use(passport.session());

    passport.use(new LocalStrategy(
    function(username, password, done){
        // TODO: check auth against database
        if(username === "jdoe@example.com" && password === "open-sesame") {
        return done(null, username);
        }
        return done(null, false);
    }
    ));

    passport.serializeUser((user, done) => {
    done(null, user);
    });

    passport.deserializeUser((user, done) => {
    done(null, user);
    });

    app.post("/login", 
    passport.authenticate("local", { failureRedirect: "/login.html" }),
    function(req, res) {
        res.redirect("/index.html");
        //res.sendFile(path.join(__dirname, "../public/index.html"));
    });

    function isUserAuthenticated(req, res, next) {
        if (req.user) {
            console.log("auth succeeded")
            next();
        } else {
            console.log("login please")
            res.send('You must login!');
        }
    }

    // TODO: for testing purposes
    app.get("/secret", isUserAuthenticated, (req, res) => {
        res.send("Page to test authentication.");
        console.log("secret route accessed by " + req.user);
    });

    //logout route not working in this file, it still lives in server.js for the time being. JG
    // app.get("/logout", (req, res) => {
    //     req.logout(); 
    //     res.redirect("/login.html");
    // });
};
