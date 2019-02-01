module.exports = function (sequelize, DataTypes) {
  var Teams = sequelize.define("Teams", {

    teamName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },

  });

  Teams.associate = function (models) {
    
    models.Teams.hasMany(models.Players, {

    });
 


    models.Teams.hasMany(models.Goals, {
      
    });

    // models.Teams.belongsTo(models.Games, {
      
    // });


  // models.Teams.hasMany(models.Penalties, {
  //   //onDelete: "cascade"
  // });


};


  //       Team.hasOne(Game, {as: 'HomeTeam', foreignKey : 'homeTeamId'});
  // Team.hasOne(Game, {as: 'AwayTeam', foreignKey : 'awayTeamId'});

  //Game.belongsTo(Team);



  return Teams;
};