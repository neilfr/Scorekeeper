var timeRemaining = sessionStorage.getItem("timeRemaining");
var gamePicked = parseInt(sessionStorage.getItem("gamePicked"));

var $gameClock = $("#gameClock");
var gameMinutes, gameSeconds, game10ths;
var running = false;


//if there is timeRemaining in the session storage - IE. there is an unfinished game - use that timeRemaining
if (timeRemaining > 0) {
  timeRemaining = sessionStorage.getItem("timeRemaining");
} else {
  timeRemaining = 3000; //otherwise we have a new game, so set the time to 5 minutes
}


/* Chris F: 02/06/2019 Work in progress.  I will get all the players in 2 arrays; home team and visitors
this can be reused for goals and penalties accordingly */

// console.log(data);
//     var playersArray = data.HomeTeam.Players;
//     for (i = 0; i < playersArray.length; i++) {
//       var $p = $("<p>");
//       // $p.attr("ID", playersArray[i].id);
//       // $p.text('#' + playersArray[i].jerseyNumber + ' ' + playersArray[i].lastName);

//       // Create a button for each player
//       var $btn = $("<button>");

//       $btn.attr("data-player-id", playersArray[i].id);
//       $btn.text(
//         "#" + playersArray[i].jerseyNumber + " " + playersArray[i].lastName
//       );

//       // Append the button to the to do item
//       $p.append($btn);
//       $(".modal-body").append($p);
//     }

/* Chris F: 02/06/2019 I created the code under the on click for "#home-team-goal" to record the goal.
For now, I just copied and paste the code into the on click for "#visitor-team-goal". 
There are some minor differences, but there is a lot of code repetition.  If we have time, 
it would be good to make a function for this to make the code more efficient, etc. */


$("#home-team-goal").on("click", function(event) {
  event.preventDefault();
  running = false;

  //Gets the time fromt the game clock.  This is a 'raw' text based format and not a true time format.
  var goalTimeRawFormat = $gameClock.text();
  //Gets the current date.
  var currentDate = moment(new Date()).format("YYYY-MM-DD");
  //Concatenantes the current date with the goal time in the raw text format
  //and formats the date and time using moment.js.
  var goalDateTime = moment(currentDate + " " + goalTimeRawFormat).format(
    "YYYY-MM-DD HH:mm:ss"
  );
  //The newGoal object that will be passed to the post api call.
  //This object will contain the necessary data to create the goal record in the db.
  var newGoal;

  //Calls the get API route to retrieve game data with the game picked (the game picked ID)
  // from local storage as the parameter.
  $.get("/api/games/" + gamePicked, function() {}).then(function(data) {
    //The current home team ID from the game data.
    var teamID = data.homeTeamId;

    // This needs to be adjusted to the actual player when we figure out what we are doing to select the player.
    //This is the player ID that scored the goal.
    var playerID = 1;

    //Setting up the newGoal object with the required fields.
    newGoal = {
      goalDateTime: goalDateTime,
      gameID: gamePicked,
      teamID: teamID,
      playerID: playerID
    };

    //Calling the post goal API route and passing the newGoal object
    //to create the goal record in the db with the contained data.
    $.post("/api/goals", newGoal, function() {});
  });
});

$("#visitor-team-goal").on("click", function(event) {
  event.preventDefault();
  running = false;
  //Gets the time fromt the game clock.  This is a 'raw' text based format and not a true time format.
  var goalTimeRawFormat = $gameClock.text();
  //Gets the current date.
  var currentDate = moment(new Date()).format("YYYY-MM-DD");
  //Concatenantes the current date with the goal time in the raw text format
  //and formats the date and time using moment.js.
  var goalDateTime = moment(currentDate + " " + goalTimeRawFormat).format(
    "YYYY-MM-DD HH:mm:ss"
  );
  //The newGoal object that will be passed to the post api call.
  //This object will contain the necessary data to create the goal record in the db.
  var newGoal;

  //Calls the get API route to retrieve game data with the game picked (the game picked ID)
  // from local storage as the parameter.
  $.get("/api/games/" + gamePicked, function() {}).then(function(data) {
    //The current visitor team ID from the game data.
    var teamID = data.visitorTeamId;

    // This needs to be adjusted to the actual player when we figure out what we are doing to select the player.
    //This is the player ID that scored the goal.
    var playerID = 1;

    //Setting up the newGoal object with the required fields.
    newGoal = {
      goalDateTime: goalDateTime,
      gameID: gamePicked,
      teamID: teamID,
      playerID: playerID
    };

    //Calling the post goal API route and passing the newGoal object
    //to create the goal record in the db with the contained data.
    $.post("/api/goals", newGoal, function() {});
  });
});

$("#home-team-penalty").on("click", function(event) {
  event.preventDefault();
  currentDateTime = new Date();

  $.get("/api/games/1", function(data) {
    console.log(data);
  });
});

$("#visitor-team-penalty").on("click", function(event) {
  event.preventDefault();
  currentDateTime = new Date();

  $.get("/api/games/1", function(data) {
    console.log(data);
  });
});

$("#start-game").on("click", function(event) {
  running = true;
});
$("#stop-game").on("click", function(event) {
  running = false;
});

var countDown = setInterval(function() {
  gameMinutes = Math.floor(timeRemaining / 600);
  gameSeconds = Math.floor((timeRemaining - gameMinutes * 600) / 10);
  game10ths = Math.floor(
    timeRemaining - (gameMinutes * 600 + gameSeconds * 10)
  );
  if (gameMinutes < 10) {
    gameMinutes = "0" + gameMinutes;
  }
  if (gameSeconds < 10) {
    gameSeconds = "0" + gameSeconds;
  }
  if (game10ths < 10) {
    game10ths = "0" + game10ths;
  }

  $gameClock.text(gameMinutes + ":" + gameSeconds + ":" + game10ths);
  sessionStorage.setItem("timeRemaining", timeRemaining);
  if (running) {
    if (--timeRemaining <= 0) {
      localStorage.removeItem("timeRemaining");
      clearInterval(countDown);
      $gameClock.text("Game Over");
    }
  }
}, 100);
