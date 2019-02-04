module.exports = function(sequelize, DataTypes) {
  var Goals = sequelize.define("Goals", {
    goalTime: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        len: [1]
      }
    }
  });

  Goals.associate = function(models) {
    //models.Goals.belongsTo(models.Teams, {});
    models.Goals.belongsTo(models.Players, {});
    models.Goals.belongsTo(models.Games, {});

    // models.Goals.belongsTo(models.Games, {});
    //     models.Goals.hasMany(models.Games,{
    //       //onDelete: "cascade"
    //     });
  };

  return Goals;
};
