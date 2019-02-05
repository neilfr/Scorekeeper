module.exports = function (sequelize, DataTypes) {
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
    /* do we need the relationship from both directions?
  
    models.Games.belongsTo(models.Teams, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  */
    models.Games.hasMany(models.Goals, {});
  };
  return Games;
};
