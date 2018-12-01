var db = require("../models");

module.exports = function(app) {
  // Load index page
  
  //GET METHOD
  app.get("/", function(req, res) {
    // db.Example.findAll({}).then(function(dbExamples) {
    //   res.render("index", {
    //     msg: "Welcome!",
    //     examples: dbExamples
    //   });
    // });
    //console.log(req.user);
    //res.send('GET request to the homepage')
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  // Load example page and pass in an example by id
  app.get("/example/:id", function(req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function(data) {
      res.render("example", {
        example: data
      });
    });
     console.log(req);

     //dont we need to have an HTML page for this to occur? 
     //res.sendFile(path.join(__dirname, "../public/login.html"));

  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
