module.exports = function(sequelize, DataTypes) {
  var Games = sequelize.define("Games", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    }
  });

  return Games;
};
