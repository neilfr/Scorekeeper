module.exports = function(sequelize, DataTypes) {
  var Players = sequelize.define("Players", {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    jerseyNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    }
  });
  Players.associate = function(models) {
    models.Players.belongsTo(models.Teams, {
      foreignKey: {
        allowNull: false
      }
    });
    models.Players.hasMany(models.Goals, {});
  };
  return Players;
};
