module.exports = function(sequelize, DataTypes) {
  var Player = sequelize.define("Player", {
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
  Player.associate = function(models) {
    models.Player.belongsTo(models.Team, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Player;
};
