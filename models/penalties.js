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
     
    });
  
    // Penalties.associate = function(models) {
    //   models.Penalties.hasMany(models.Teams,{
    //     //onDelete: "cascade"
    //   });
  

   
    //     models.Goals.hasMany(models.Players,{
    //       //onDelete: "cascade"
    //     });
      
    
     
    //     models.Goals.hasMany(models.Games,{
    //       //onDelete: "cascade"
    //     });
    //   };
                
    return Penalties;
  };
  
  