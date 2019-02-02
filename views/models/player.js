module.exports = function(sequelize, DataTypes) {
  var Player = sequelize.define("Player", {
    text: DataTypes.STRING,
    description: DataTypes.TEXT
  });
  return Player;
};
