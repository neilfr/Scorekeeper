var db = require("../models");
var moment = require("moment");
var Op = require("sequelize").Op;

module.exports = function(app) {
  app.get("/api/games", function(req, res) {
    db.Games.findAll({
      include: [
        {
          model: db.Goals,
          include: [db.Players]
        },
        {
          model: db.Penalties,
          include: [db.Players]
        },
        {
          model: db.Teams,
          as: "HomeTeam" // specifies how we want to be able to access our joined rows on the returned data
        },
        {
          model: db.Teams,
          as: "VisitorTeam" // specifies how we want to be able to access our joined rows on the returned data
        }
      ]
    }).then(function(dbGames) {
      res.json(dbGames);
    });
  });

  app.get("/api/games/:id", function(req, res) {
    // Here we add an "include" property to our options in our findOne query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Post
    db.Games.findOne({
      where: {
        id: req.params.id
      },
      include: [
        {
          model: db.Goals,
          include: [db.Players]
        },
        {
          model: db.Penalties,
          include: [db.Players]
        },
        {
          model: db.Teams,
          as: "HomeTeam" // specifies how we want to be able to access our joined rows on the returned data
        },
        {
          model: db.Teams,
          as: "VisitorTeam" // specifies how we want to be able to access our joined rows on the returned data
        }
      ]
    }).then(function(dbGames) {
      res.json(dbGames);
    });
  });

  app.get("/api/gamesbydate/:dateOption", function(req, res) {
    var dateOption = req.params.dateOption;
    var dateCriteriaObject;
    var startDateRange = moment(new Date()).format("YYYY-MM-DD 00:00:00");
    var endDateRange = moment(new Date()).format("YYYY-MM-DD 11:59:59");

    if (dateOption === "today") {
      dateCriteriaObject = {
        [Op.gte]: startDateRange,
        [Op.lte]: endDateRange
      };
    } else if (dateOption === "past") {
      dateCriteriaObject = {
        [Op.lte]: startDateRange
      };
    } else if (dateOption === "future") {
      dateCriteriaObject = {
        [Op.gte]: endDateRange
      };
    }

    db.Games.findAll({
      where: {
        //id: req.params.id
        gameDate: dateCriteriaObject
      },
      include: [
        {
          model: db.Goals,
          include: [db.Players]
        },
        {
          model: db.Penalties,
          include: [db.Players]
        },
        {
          model: db.Teams,
          as: "HomeTeam" // specifies how we want to be able to access our joined rows on the returned data
        },
        {
          model: db.Teams,
          as: "VisitorTeam" // specifies how we want to be able to access our joined rows on the returned data
        }
      ]
    }).then(function(dbGames) {
      res.json(dbGames);
    });
  });

  // Get all teams

  app.get("/api/teams", function(req, res) {
    db.Teams.findAll({
      include: [
        {
          model: db.Players
        }
      ]
    }).then(function(dbTeams) {
      res.json(dbTeams);
    });
  });

  // Get team by id
  app.get("/api/teams/:id", function(req, res) {
    db.Teams.findOne({ where: { id: req.params.id } }).then(function(dbTeam) {
      res.json(dbTeam);
    });
  });

  // Create a new team
  app.post("/api/teams", function(req, res) {
    db.Teams.create(req.body).then(function(dbTeam) {
      res.json(dbTeam);
    });
  });

  // Delete a team by id
  app.delete("/api/teams/:id", function(req, res) {
    db.Teams.destroy({ where: { id: req.params.id } }).then(function(dbTeam) {
      res.json(dbTeam);
    });
  });

  // Get all players
  app.get("/api/players", function(req, res) {
    db.Players.findAll({}).then(function(dbPlayers) {
      res.json(dbPlayers);
    });
  });

  // Get player by id
  app.get("/api/players/:id", function(req, res) {
    db.Players.findOne({ where: { id: req.params.id } }).then(function(
      dbPlayer
    ) {
      res.json(dbPlayer);
    });
  });

  // Create a new player
  app.post("/api/players", function(req, res) {
    db.Players.create(req.body).then(function(dbPlayer) {
      res.json(dbPlayer);
    });
  });

  // Delete a player by id
  app.delete("/api/players/:id", function(req, res) {
    db.Players.destroy({ where: { id: req.params.id } }).then(function(
      dbPlayer
    ) {
      res.json(dbPlayer);
    });
  });

  // Get game by id
  app.get("/api/games/:id", function(req, res) {
    db.Games.findOne({ where: { id: req.params.id } }).then(function(dbTeam) {
      res.json(dbTeam);
    });
  });

  // Create a new game
  app.post("/api/games", function(req, res) {
    db.Games.create(req.body).then(function(dbGame) {
      res.json(dbGame);
    });
  });

  // Delete a game by id
  app.delete("/api/games/:id", function(req, res) {
    db.Games.destroy({ where: { id: req.params.id } }).then(function(dbGame) {
      res.json(dbGame);
    });
  });

  app.post("/api/goals", function(req, res) {
    db.Goals.create(req.body).then(function(dbGoals) {
      res.json(dbGoals);
    });
  });

  app.post("/api/penalties", function(req, res) {
    db.Penalties.create(req.body).then(function(dbPenalties) {
      res.json(dbPenalties);
    });
  });
};
