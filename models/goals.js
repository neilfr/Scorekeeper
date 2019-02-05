module.exports = function(sequelize, DataTypes) {
  var Goals = sequelize.define("Goals", {
    time: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    }
  });
  Goals.associate = function(models) {
    models.Goals.belongsTo(models.Teams, {});
    models.Goals.belongsTo(models.Players, {});
    models.Goals.belongsTo(models.Games, {});
  };
  return Goals;
};
