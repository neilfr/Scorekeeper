module.exports = function(sequelize, DataTypes) {
  var Team = sequelize.define("Team", {
    text: DataTypes.STRING,
    description: DataTypes.TEXT
  });
  return Team;
};
