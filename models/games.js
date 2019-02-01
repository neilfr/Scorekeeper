module.exports = function (sequelize, DataTypes) {
  var Games = sequelize.define("Games", {

    gameDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
  });

  // Games.associate = function (models) {
  //   models.Games.belongsToMany(models.Teams, {
  //       as: 'homeTeam'
  //   });
  //   models.Games.belongsToMany(models.Teams, {
  //     as: 'visitorTeam'
  // });
  // };

  



  return Games;
};