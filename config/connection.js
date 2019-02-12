// Set up MySQL connection.
var mysql = require("mysql");
var connection;

if(process.env.JAWSDB_URL){
  connection = mysql.createConnection(process.env.JAWSDB_URL);
}
else{c
  connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "scorekeeper"
});
}

// Export connection for our ORM to use.
module.exports = connection;
