require("dotenv").config();
var express = require("express");
var exphbs = require("express-handlebars");

var db = require("./models");

var app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http); //socketio

var PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

//socketio
io.on("connection", function(socket) {
  console.log("a user connected!");
  console.log("socket.handshake is:");
  console.log(socket.handshake);
  console.log("gameId is:");
  var gameId = socket.handshake.query.gameId;
  console.log(gameId);

  socket.on("goalEvent" + gameId, function(goalMessage) {
    // console.log("goalEvent: " + goalMessage);
    io.emit("goalEvent" + gameId, goalMessage);
  });
  socket.on("timerEvent" + gameId, function(timerMessage) {
    //console.log("timerEvent: " + timerMessage);
    io.emit("timerEvent" + gameId, timerMessage);
  });
  /*socket.on("goalEvent", function(goalMessage) {
    // console.log("goalEvent: " + goalMessage);
    io.emit("goalEvent", goalMessage);
  });
  socket.on("timerEvent", function(timerMessage) {
    //console.log("timerEvent: " + timerMessage);
    io.emit("timerEvent", timerMessage);
  });
  */
});

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function() {
  //  app.listen(PORT, function() {
  http.listen(PORT, function() {
    // added this for socket
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;
