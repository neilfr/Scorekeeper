module.exports = function(sequelize, DataTypes) {
    var Penalties = sequelize.define("penalties", {
  
      time: {
        type: DataTypes.DATETIME,
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
  
    Penalties.associate = function(models) {
      models.Penalties.hasMany(models.Teams,{
        //onDelete: "cascade"
      });
    };

    Penalties.associate = function(models) {
        models.Goals.hasMany(models.Players,{
          //onDelete: "cascade"
        });
      };
    
      Penalties.associate = function(models) {
        models.Goals.hasMany(models.Games,{
          //onDelete: "cascade"
        });
      };
                
    return Goals;
  };
  
  