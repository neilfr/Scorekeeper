var timeRemaining = sessionStorage.getItem("timeRemaining");
var gamePicked = parseInt(sessionStorage.getItem("gamePicked"));

var $gameClock = $("#gameClock");
var gameMinutes, gameSeconds, game10ths;
var gameClock;
var running = false;
var homeTeamID;
var visitorTeamID;
var homeTeamName;
var homeTeamPlayersArray;
var visitorTeamPlayersArray;
var timeRemainingUponEvent;
var totalHomeGoals = 0;
var totalVisitorGoals = 0;

//var socket = io("http://localhost:3000?gameId=" + gamePicked);
var socket = io(
  window.location.protocol +
  "//" +
  window.location.host +
  "?gameId=" +
  gamePicked
);

//if there is timeRemaining in the session storage - IE. there is an unfinished game - use that timeRemaining
if (timeRemaining > 0) {
  timeRemaining = sessionStorage.getItem("timeRemaining");
} else {
  timeRemaining = 3000; //otherwise we have a new game, so set the time to 5 minutes
}

/* Chris F: 02/06/2019 Work in progress.  I will get all the players in 2 arrays; home team and visitors
this can be reused for goals and penalties accordingly */

//Calls the get API route to retrieve game data with the game picked (the game picked ID)
// from local storage as the parameter.
$(document).ready(function () {
  $.get("/api/games/" + gamePicked, function () {}).then(function (data) {
    /*
        Creates the home team players array and visitor team players 
        array based on the players attached to the game object returned 
        as the data variable.
    
        These arrays will hold the player data for the home team and visitor team.
        These array will be used for home team goals and penalties and visitor team goals and penalties.
        */
    homeTeamPlayersArray = data.HomeTeam.Players;
    visitorTeamPlayersArray = data.VisitorTeam.Players;
    //The current home team ID and name from the game data.
    homeTeamID = data.homeTeamId;
    homeTeamName = data.HomeTeam.teamName;

    //The current visitor team ID and name from the game data.
    visitorTeamID = data.visitorTeamId;
    visitorTeamName = data.VisitorTeam.teamName;

    // feeding the names in respective divs
    $("#home-name").text(homeTeamName);
    $("#visitor-name").text(visitorTeamName);

    //Loop through the home team players array and create the player buttons
    //and then attach the buttons to the modal that already exists on the html.
    for (i = 0; i < homeTeamPlayersArray.length; i++) {
      //Create a paragraph to hold the buttons.
      var $p = $("<p>");

      // Create a button for each player
      var $btn = $("<button>");
      //Make the button blue for home team.
      $btn.addClass("btn btn-primary");
      //Make the button dismiss the modal.
      $btn.attr("data-dismiss", "modal");

      /* Assign the data attribute with the playerID to the button.
      This data attribute will be used to identify the player ID
      for goals or penalties.*/
      $btn.attr("data-hometeam-player-id", homeTeamPlayersArray[i].id);
      $btn.attr("id", "hometeam-player");

      //Set the button text for the player i.e. jersey number and last name.
      $btn.text(
        "#" +
        homeTeamPlayersArray[i].jerseyNumber +
        " " +
        homeTeamPlayersArray[i].lastName
      );
      //Append the button to the paragraph.
      $p.append($btn);
      // Append the button to the applicable home team modal.
      $("#modal-body-hometeam").append($p);
    }

    //Loop through the visitor team players array and create the player buttons
    //and then attach the buttons to the modal that already exists on the html.
    for (i = 0; i < visitorTeamPlayersArray.length; i++) {
      //Create a paragraph to hold the buttons.
      var $p = $("<p>");

      // Create a button for each player
      var $btn = $("<button>");
      //Make the button grey for visitor team
      $btn.addClass("btn btn-secondary");
      //Make the button dismiss the modal.
      $btn.attr("data-dismiss", "modal");
      /* Assign the data attribute with the playerID to the button.
      This data attribute will be used to identify the player ID
      for goals or penalties.*/
      $btn.attr("data-visitorteam-player-id", visitorTeamPlayersArray[i].id);
      $btn.attr("id", "visitorteam-player");

      //Set the button text for the player i.e. jersey number and last name.
      $btn.text(
        "#" +
        visitorTeamPlayersArray[i].jerseyNumber +
        " " +
        visitorTeamPlayersArray[i].lastName
      );
      //Append the button to the paragraph.
      $p.append($btn);
      // Append the button to the applicable visitor team modal.
      $("#modal-body-visitorteam").append($p);
    }
  });

  //from in class example
  // $(document.body).on("click", ".checkbox", function() {

  //   // Get the number of the button from its data attribute and hold in a variable called  toDoNumber.
  //   var toDoNumber = $(this).attr("data-to-do");

  //   // Select and Empty the specific <p> element that previously held the to do item number.
  //   $("#item-"+toDoNumber).remove();

  // });

  /* Chris F: 02/06/2019 I created the code under the on click for "#home-team-goal" to record the goal.
For now, I just copied and paste the code into the on click for "#visitor-team-goal". 
There are some minor differences, but there is a lot of code repetition.  If we have time, 
it would be good to make a function for this to make the code more efficient, etc. */
  //$("#home-team-goal").on("click", function(event) {

  $("body").on("click", "#home-team-goal", function (event) {
    event.preventDefault();
    running = false;
    var $p = $("<p>");
    $p.html("Please select the Home Team player that scored the goal.");
    $("#modal-title-hometeam").html($p);

    timeRemainingUponEvent = timeRemaining;
  });

  $("body").on("click", "#visitor-team-goal", function (event) {
    event.preventDefault();
    running = false;
    var $p = $("<p>");
    $p.html("Please select the Visitor Team player that scored the goal.");
    $("#modal-title-visitorteam").html($p);

    timeRemainingUponEvent = timeRemaining;
  });

  /*Used the body tag to attach the event as per Angelo this is the jQuery 
  best practice.  This allows 1 event for the entire body and then passes the 
  element to the event.  This is  better than having multiple events for each button.
  This was the old code: $("#hometeam-player").on("click", function(event) {
    */
  $("body").on("click", "#hometeam-player", function (event) {
    event.preventDefault();
    $(".scorelog").css("display", "block");
    //The newGoal object that will be passed to the post api call.
    //This object will contain the necessary data to create the goal record in the db.
    var newGoal;

    // The playerID from the player selected from the model based on the data attribute.
    var playerID = $(this).attr("data-hometeam-player-id");

    //Setting up the newGoal object with the required fields.
    newGoal = {
      timeRemaining: timeRemainingUponEvent,
      gameID: gamePicked,
      teamID: homeTeamID,
      playerID: playerID
    };
    totalHomeGoals += 1;
    $("#hscore").text(totalHomeGoals);
    if (totalVisitorGoals < totalHomeGoals) {
      $('#hscore').addClass('winner')
      if (totalVisitorGoals === 0) {
        $('#vscore').text("0")
      }
      $("#hscore").addClass("winner");
    } else if (totalVisitorGoals === totalHomeGoals) {
      $("#vscore").removeClass("winner");
    }

    //CF: Calling the post goal API route and passing the newGoal object
    //to create the goal record in the db with the contained data.

    $.post("/api/goals", newGoal)
      .then(function () {
        socket.emit("goalEvent" + gamePicked);
      })
      .catch(function (err) {
        console.log("error", err);
      });
  });

  // $("#visitorteam-player").on("click", function(event) {
  $("body").on("click", "#visitorteam-player", function (event) {
    event.preventDefault();
    running = false;
    $(".scorelog").css("display", "block");

    //The newGoal object that will be passed to the post api call.
    //This object will contain the necessary data to create the goal record in the db.
    var newGoal;

    // The playerID from the player selected from the model based on the data attribute.
    var playerID = $(this).attr("data-visitorteam-player-id");

    //Setting up the newGoal object with the required fields.
    newGoal = {
      timeRemaining: timeRemainingUponEvent,
      gameID: gamePicked,
      teamID: visitorTeamID,
      playerID: playerID
    };

    totalVisitorGoals += 1;
    $("#vscore").text(totalVisitorGoals);
    if (totalVisitorGoals > totalHomeGoals) {
      $('#vscore').addClass('winner')
      if (totalHomeGoals === 0) {
        $('#hscore').text("0");
      }
    } else if (totalVisitorGoals === totalHomeGoals) {
      $("#hscore").removeClass("winner");
    }

    //Calling the post goal API route and passing the newGoal object
    //to create the goal record in the db with the contained data.

    //CF: Calling the post goal API route and passing the newGoal object
    //to create the goal record in the db with the contained data.

    $.post("/api/goals", newGoal)

      // .then(function (response) {
      //   goalAnnounce(newGoal); 
      .then(function () {
        socket.emit("goalEvent" + gamePicked);
      })
      .catch(function (err) {
        console.log("error", err);
      });
  });

  $("#home-team-penalty").on("click", function (event) {
    event.preventDefault();
    currentDateTime = new Date();

    $.get("/api/games/1", function (data) {
      console.log(data);
    });
  });

  $("#visitor-team-penalty").on("click", function (event) {
    event.preventDefault();
    currentDateTime = new Date();

    $.get("/api/games/1", function (data) {
      console.log(data);
    });
  });

  //$("#start-game").on("click", function(event) {
  $("body").on("click", "#start-game", function (event) {
    running = true;
  });

  $("body").on("click", "#stop-game", function (event) {
    //$("#stop-game").on("click", function(event) {
    running = false;
  });

  var countDown = setInterval(function () {
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

    // $gameClock.text(gameMinutes + ":" + gameSeconds + ":" + game10ths);
    $(".minutes").text(gameMinutes);
    $(".seconds").text(gameSeconds);
    $(".milliseconds").text(game10ths);

    sessionStorage.setItem("timeRemaining", timeRemaining);

    gameClock = gameMinutes + ":" + gameSeconds + ":" + game10ths;
    socket.emit("timerEvent" + gamePicked, gameClock);
    if (running) {
      if (--timeRemaining <= 0) {
        localStorage.removeItem("timeRemaining");
        clearInterval(countDown);
        $gameClock.text("Game Over");
        socket.emit("timerEvent" + gamePicked, "Game Over");
      }
    }
  }, 100);
});

function goalAnnounce(goalData) {
  //get game data for the current game so we can calculate the current game score
  $.get("/api/games/" + gamePicked, function () {}).then(function (data) {
    //push a goal announcement using socket.io
    socket.emit("goalEvent" + gamePicked, data);
  });
}