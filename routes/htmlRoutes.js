var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.render("index", {
        msg: "Welcome!",
        examples: dbExamples
      });
    });
  });

  // Load manageTeams page
  app.get("/manageTeams/", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.render("manageTeams", {
        msg: "Welcome to Team Manager!",
        examples: dbExamples
      });
    });
  });
  
  // Load managePlayers page
  app.get("/managePlayers/", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.render("managePlayers", {
        msg: "Welcome to Player Manager!",
        examples: dbExamples
      });
    });
  });

  // Load manageGames page
  app.get("/manageGames/", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.render("manageGames", {
        msg: "Welcome to Game Manager!",
        examples: dbExamples
      });
    });
  });

  // Load game page and pass in a game id
  app.get("/game/:id", function(req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
      res.render("game", {
        example: dbExample
      });
    });
  });


/*
  // Load example page and pass in an example by id
  app.get("/example/:id", function(req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
      res.render("example", {
        example: dbExample
      });
    });
  });
*/
  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
