module.exports = function(sequelize, DataTypes) {
    var Games = sequelize.define("games", {
  
      date: {
        type: DataTypes.DATETIME,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
     
    });
  
    Games.associate = function(models) {
      models.Games.hasMany(models.Teams,{
        //onDelete: "cascade"
      });
    };
                
    return Games;
  };
  
  