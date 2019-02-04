module.exports = function(sequelize, DataTypes) {
  var Game = sequelize.define("Game", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    }
  });
  /*
  Game.associate = function(models) {
    models.Game.belongsTo(models.Team, {
      as: "homeTeam"
    });
  };
  */

  Game.associate = function(models) {
    models.Game.belongsTo(models.Team, {
      as: "homeTeam"
    });
  };

  return Game;
};
