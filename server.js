var express = require("express");
var exphbs = require("express-handlebars");

var db = require("./models");
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;

var app = express();
var PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

// Passport
app.use(passport.initialize());

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
    res.redirect("/");
  });

// Logout route
app.get("/logout", (req, res) => {
  req.logout(); 
  res.redirect("/");
});

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;
