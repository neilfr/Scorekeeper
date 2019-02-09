module.exports = function(sequelize, DataTypes) {
  var Penalties = sequelize.define("Penalties", {
    penaltyTime: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    durationMinutes: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        len: [1]
      }
    }
    // penaltyType: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    //   validate: {
    //     len: [1]
    //   }
    // }
  });

  Penalties.associate = function(models) {
    models.Penalties.belongsTo(models.Players, {});

    models.Penalties.belongsTo(models.Games, {});
    // models.Penalties.belongsTo(models.Games, {});
  };

  return Penalties;
};
