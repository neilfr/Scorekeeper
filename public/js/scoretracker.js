//scoretracker.js
var socket = io();
socket.on("myEvent", function(msg) {
  var game = document.getElementById("game");
  var player = document.getElementById("player");
  var team = document.getElementById("team");
  var timeRemaining = document.getElementById("timeRemaining");

  game.innerHTML = msg.gameID;
  player.innerHTML = msg.playerID;
  team.innerHTML = msg.teamID;
  timeRemaining.innerHTML = msg.timeRemaining;
});
