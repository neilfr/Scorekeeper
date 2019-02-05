module.exports = function (sequelize, DataTypes) {
  var Teams = sequelize.define("Teams", {

    teamName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    }
  });
  Teams.associate = function(models) {
    models.Teams.hasMany(models.Players, {
      // onDelete: "cascade"
    });
  };
  Teams.associate = function(models) {
    models.Teams.hasMany(models.Games, {
      as: "homeTeam",
      foreignKey: "homeTeamId"
    });
    models.Teams.hasMany(models.Games, {
      as: "visitingTeam",
      foreignKey: "visitingTeamId"
    });
    models.Teams.hasMany(models.Goals, {});
  };

  return Teams;
};
