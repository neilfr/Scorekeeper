var db = require("../models");

module.exports = function (app) {
  // Load index page
<<<<<<< HEAD
  // app.get("/", function (req, res) {
  //   db.Example.findAll({}).then(function (dbExamples) {
  //     res.render("manageTeams", {
  //       msg: "Welcome!",
  //       examples: dbExamples
  //     });
  //   });
  // });

  app.get("/players", function (req, res) {
    db.Example.findAll({}).then(function (dbExamples) {
      res.render("managePlayers");
=======
 /* app.get("/teamManager", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.render("index", {
        msg: "Welcome!",
        examples: dbExamples
      });
>>>>>>> 2f93cefb7b324114ba9269089376936f2ca7b7a3
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
    db.Team.findAll({}).then(function(dbTeams) {
      res.render("teamManager", {
        msg: "Welcome!",
        teams: dbTeams
      });
    });
  });

  // Load teamManager page and pass in a team by id
  app.get("/team/:id", function(req, res) {
    db.Team.findOne({ where: { id: req.params.id } }).then(function(dbTeam) {
      res.render("teamManager", {
        team: dbTeam
      });
    });
  });

  // Load playerManager page
  app.get("/playerManager", function(req, res) {
    db.Player.findAll({}).then(function(dbPlayers) {
      res.render("playerManager", {
        msg: "Welcome!",
        players: dbPlayers
      });
    });
  });

  // Load playerManager page and pass in a player by id
  app.get("/player/:id", function(req, res) {
    db.Player.findOne({ where: { id: req.params.id } }).then(function(dbPlayer) {
      res.render("playerManager", {
        player: dbPlayer
      });
    });
  });

<<<<<<< HEAD
/*
  // Load example page and pass in an example by id
  app.get("/example/:id", function (req, res) {
    db.Example.findOne({
      where: {
        id: req.params.id
      }
    }).then(function (dbExample) {
      res.render("example", {
        example: dbExample
=======
  // Load gameManager page
  app.get("/gameManager", function(req, res) {
    db.Game.findAll({}).then(function(dbGames) {
      res.render("gameManager", {
        msg: "Welcome!",
        games: dbGames
      });
    });
  });

  // Load gameManager page and pass in a game by id
  app.get("/game/:id", function(req, res) {
    db.Game.findOne({ where: { id: req.params.id } }).then(function(dbGame) {
      res.render("gameManager", {
        game: dbGame
>>>>>>> 2f93cefb7b324114ba9269089376936f2ca7b7a3
      });
    });
  });
  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};