module.exports = function(sequelize, DataTypes) {
    var Teams = sequelize.define("teams", {
  
      teamName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
     
    });
  
    Teams.associate = function(models) {
      models.Teams.hasMany(models.Players,{
        //onDelete: "cascade"
      });
    };
  
    Teams.associate = function(models) {
      models.Teams.hasMany(models.Goals,{
        //onDelete: "cascade"
      });
    };

    Teams.associate = function(models) {
        models.Teams.hasMany(models.Penalties,{
          //onDelete: "cascade"
        });
      };
    
    Teams.associate = function(models) {
        models.Teams.hasMany(models.Games,{
          //onDelete: "cascade"
         foreignKey: 'homeTeamId'
        });
      };

      Teams.associate = function(models) {
        models.Teams.hasMany(models.Games,{
          //onDelete: "cascade"
         foreignKey: 'visitorTeamId'
        });
      };


//       Team.hasOne(Game, {as: 'HomeTeam', foreignKey : 'homeTeamId'});
// Team.hasOne(Game, {as: 'AwayTeam', foreignKey : 'awayTeamId'});

//Game.belongsTo(Team);
   
  
        
      return Teams;
  };
  
  