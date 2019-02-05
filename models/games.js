module.exports = function(sequelize, DataTypes) {
  var Games = sequelize.define("Games", {
    gameDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        len: [1]
      }
    }
  });

  Games.associate = function(models) {
    models.Games.belongsTo(models.Teams, {
      as: "HomeTeam",
      foreignKey: "homeTeamId"
    });

    models.Games.belongsTo(models.Teams, {
      as: "VisitorTeam",
      foreignKey: "visitorTeamId"
    });

    models.Games.hasMany(models.Goals, {});

    models.Games.hasMany(models.Penalties, {});

    models.Games.belongsTo(models.Players, {});
  };

  return Games;
};
