module.exports = function (sequelize, DataTypes) {
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

  // Players.associate = function (models) {
  //   models.Players.hasMany(models.Goals, {
  //     //foreignKey: 'playerId'

  //     //onDelete: "cascade"
  //   });
  // };


  // models.Players.hasMany(models.Penalties, {
  //   foreignKey: 'playerId'
  //   //onDelete: "cascade"
  // });


  Players.associate = function (models) {
  models.Players.belongsTo(models.Teams, {
    foreignKey: {
      allowNull: false
    }
  });


   models.Players.hasMany(models.Goals, {
  
    });


}



  return Players;
};