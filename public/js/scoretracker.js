//scoretracker.js
var socket = io();
socket.on("goalEvent", function(msg) {
  var $goalTable = $("#goalTable");
  var $tr = $("<tr>");
  $tr.append("<td>" + msg.gameID + "</td>");
  $tr.append("<td>" + msg.teamID + "</td>");
  $tr.append("<td>" + msg.playerID + "</td>");
  $tr.append("<td>" + gameTime(msg.timeRemaining) + "</td>");
  $goalTable.append($tr);
});

socket.on("timerEvent", function(timeRemaining) {
  $("#gameTime").html("Time Remaining: " + timeRemaining);
});

function gameTime(timeRemaining) {
  var gameMinutes = Math.floor(timeRemaining / 600);
  var gameSeconds = Math.floor((timeRemaining - gameMinutes * 600) / 10);
  var game10ths = Math.floor(
    timeRemaining - (gameMinutes * 600 + gameSeconds * 10)
  );
  if (gameMinutes < 10) {
    gameMinutes = "0" + gameMinutes;
  }
  if (gameSeconds < 10) {
    gameSeconds = "0" + gameSeconds;
  }
  return gameMinutes + ":" + gameSeconds + ":" + game10ths;
}
