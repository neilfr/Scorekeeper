//scoretracker.js
var socket = io();
socket.on("goalEvent", function(data) {
  console.log("data received is:");
  console.log(data);
  var homeScore = 0;
  var visitorScore = 0;
  var homeTeamID = data.HomeTeam.id;
  var $goalTable = $("#goalTable");

  //loop through the goal data for the game and
  // 1. build a table row for each goal and append to the goal table
  // 2. increment counters for each goal their team scored
  for (i = 0; i < data.Goals.length; i++) {
    var $tr = $("<tr>");
    $tr.append("<td>" + data.Goals[i].GameId + "</td>");
    $tr.append("<td>" + data.Goals[i].TeamId + "</td>");
    $tr.append("<td>" + data.Goals[i].PlayerId + "</td>");
    $tr.append("<td>" + gameTime(data.Goals[i].timeRemaining) + "</td>");
    $goalTable.append($tr);
    if (data.Goals[i].TeamId === homeTeamID) {
      homeScore++;
    } else {
      visitorScore++;
    }
  }
  $("#homeScore").html("Home: " + homeScore);
  $("#visitorScore").html("Visitor: " + visitorScore);
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
