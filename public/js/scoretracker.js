//scoretracker.js
var socket = io();
socket.on("myEvent", function(msg) {
  /*  var game = document.getElementById("game");
  var player = document.getElementById("player");
  var team = document.getElementById("team");
  var timeRemaining = document.getElementById("timeRemaining");

  game.innerHTML = msg.gameID;
  player.innerHTML = msg.playerID;
  team.innerHTML = msg.teamID;
  timeRemaining.innerHTML = msg.timeRemaining;*/
  var $goalTable = $("#goalTable");
  var $tr = $("<tr>");
  $tr.append("<td>" + msg.gameID + "</td>");
  $tr.append("<td>" + msg.playerID + "</td>");
  $tr.append("<td>" + msg.teamID + "</td>");
  $tr.append("<td>" + msg.timeRemaining + "</td>");
  $goalTable.append($tr);
});
