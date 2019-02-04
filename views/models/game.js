module.exports = function(sequelize, DataTypes) {
  var Game = sequelize.define("Game", {
    text: DataTypes.STRING,
    description: DataTypes.TEXT
  });
  return Game;
};
