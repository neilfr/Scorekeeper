var db = require("../models");

module.exports = function(app) {
  // Load index page
  /* app.get("/teamManager", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.render("index", {
        msg: "Welcome!",
        examples: dbExamples
      });
    });
  });

  // Load example page and pass in an example by id
  app.get("/example/:id", function(req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
      res.render("example", {
        example: dbExample
      });
    });
  });
*/
  // Load teamManager page
  app.get("/teamManager", function(req, res) {
    db.Teams.findAll({}).then(function(dbTeams) {
      res.render("teamManager", {
        msg: "Welcome!",
        teams: dbTeams
      });
    });
  });

  // Load teamManager page and pass in a team by id
  app.get("/team/:id", function(req, res) {
    db.Teams.findOne({ where: { id: req.params.id } }).then(function(dbTeam) {
      res.render("teamManager", {
        team: dbTeam
      });
    });
  });

  // Load playerManager page
  app.get("/playerManager", function(req, res) {
    db.Players.findAll({}).then(function(dbPlayers) {
      res.render("playerManager", {
        msg: "Welcome!",
        players: dbPlayers
      });
    });
  });

  // Load playerManager page and pass in a player by id
  app.get("/player/:id", function(req, res) {
    db.Players.findOne({ where: { id: req.params.id } }).then(function(
      dbPlayer
    ) {
      res.render("playerManager", {
        player: dbPlayer
      });
    });
  });

  // Load gameManager page
  app.get("/gameManager", function(req, res) {
    db.Games.findAll({}).then(function(dbGames) {
      res.render("gameManager", {
        msg: "Welcome!",
        games: dbGames
      });
    });
  });

  // Load gameManager page and pass in a game by id
  /*
  app.get("/game/:id", function(req, res) {
    db.Games.findOne({ where: { id: req.params.id } }).then(function(dbGame) {
      res.render("gameManager", {
        game: dbGame
      });
    });
  });
*/

  // Load gamePicker page
  app.get("/gamePicker", function(req, res) {
    db.Games.findAll({}).then(function(dbGames) {
      res.render("gamePicker", {
        msg: "Welcome!",
        games: dbGames
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
