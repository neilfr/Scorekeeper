var db = require("../models");

module.exports = function(app) {

  // Create a new team
  app.post("/api/team", function(req, res) {
    db.Teams.create(req.body).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  // Create a new player
  app.post("/api/player", function(req, res) {
    db.Players.create(req.body).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  // get all teams in the league
  app.get("/api/teams", function(req, res) {
    db.Teams.findAll({}).then(function(dbExamples) {
      res.json(dbExamples);
    });
  });
  
  // Create a new game
  app.post("/api/game", function(req, res) {
    db.Games.create(req.body).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  // Get all games
  app.get("/api/games", function(req, res) {
    db.Games.findAll({}).then(function(dbExamples) {
      res.json(dbExamples);
    });
  });
  
  // Get teams from a game
  app.get("/api/teams/:gameid", function(req, res) {
    db.Teams.findAll({}).then(function(dbExamples) {
      res.json(dbExamples);
    });
  });
  
  // Get players from teamid
  app.get("/api/players/:teamid", function(req, res) {
    db.Players.findAll({}).then(function(dbExamples) {
      res.json(dbExamples);
    });
  });

  // Create a new goal entry
  app.post("/api/goal", function(req, res) {
    db.Goals.create(req.body).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  // Create a new penalty entry
  app.post("/api/penalty", function(req, res) {
    db.Penalties.create(req.body).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  // Delete a team by id
  app.delete("/api/teams/:id", function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  // Delete a game by id
  app.delete("/api/games/:id", function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  // Delete a player by id
  app.delete("/api/players/:id", function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
      res.json(dbExample);
    });
  });



  /*
  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
      res.json(dbExample);
    });
  });
  */
};
