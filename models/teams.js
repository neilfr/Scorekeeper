module.exports = function(sequelize, DataTypes) {
    var Teams = sequelize.define("Teams", {
        name: DataTypes.STRING
    });
    return Teams;
};