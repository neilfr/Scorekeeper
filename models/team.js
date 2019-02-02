module.exports = function(sequelize, DataTypes) {
  var Team = sequelize.define("Team", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    }
  });
  Team.associate = function(models) {
    models.Team.hasMany(models.Player, {
      onDelete: "cascade"
    });
  };
  Team.associate = function(models) {
    models.Team.hasMany(models.Game, {
      as: "homeTeam",
      foreignKey: "homeTeamId"
    });
    models.Team.hasMany(models.Game, {
      as: "visitingTeam",
      foreignKey: "visitingTeamId"
    });
  };

  return Team;
};
