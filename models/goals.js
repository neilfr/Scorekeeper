module.exports = function(sequelize, DataTypes) {
    var Goals = sequelize.define("goals", {
  
      time: {
        type: DataTypes.DATETIME,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
     
    });
  
    Goals.associate = function(models) {
      models.Goals.hasMany(models.Teams,{
        //onDelete: "cascade"
      });
    };

    Goals.associate = function(models) {
        models.Goals.hasMany(models.Players,{
          //onDelete: "cascade"
        });
      };
    
      Goals.associate = function(models) {
        models.Goals.hasMany(models.Games,{
          //onDelete: "cascade"
        });
      };
                
    return Goals;
  };
  
  