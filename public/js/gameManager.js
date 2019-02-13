// Get references to page elements

//var $gameName = $("#game-name");
var $submitBtn = $("#submit");
var $gameList = $("#game-list");
var $homeTeamSelect = $("#homeTeam");
var $visitorTeamSelect = $("#visitorTeam");
var $gameDay = $("#gameDay");
var $gameTime = $("#gameTime");

// The API object contains methods for each kind of request we'll make
var API = {
  savegame: function (game) {
    return $.post("api/games", game);
  },
  getgames: function () {
    return $.ajax({
      url: "api/games",
      type: "GET"
    });
  },
  deletegame: function (id) {
    return $.ajax({
      url: "api/games/" + id,
      type: "DELETE"
    });
  }
};

// refreshgames gets new games from the db and repopulates the list
var refreshgames = function () {
  API.getgames().then(function (data) {
    var $games = data.map(function (game) {
      console.log(game);
      var $a = $("<a>")
        .text(
          "Home:" +
          game.HomeTeam.teamName +
          ", Visitor:" +
          game.VisitorTeam.teamName +
          ", Date and Time:" +
          moment(game.gameDate).format("ddd MMM Do YYYY h:mm a")
        )

        .attr("href", "/api/games/" + game.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": game.id
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn float-right delete")
      $(' <div id="delete-icon" class="display-icon"> <i class="fa fa-trash "></i> </div> ').appendTo($button);

      $li.append($button);

      return $li;
    });

    $gameList.empty();
    $gameList.append($games);
  });
};

// handleFormSubmit is called whenever we submit a new game
// Save the new game to the db and refresh the list
var handleFormSubmit = function (event) {
  event.preventDefault();
  console.log("home team");
  console.log($homeTeamSelect.val());
  console.log("visitor team");
  console.log($visitorTeamSelect.val());
  console.log("game day");
  console.log($gameDay.val());
  console.log("game time");
  console.log($gameTime.val());
  console.log($gameDay.val() + " " + $gameTime.val());
  var game = {
    homeTeamId: $homeTeamSelect.val(),
    visitorTeamId: $visitorTeamSelect.val(),
    gameDate: moment($gameDay.val() + " " + $gameTime.val()).format(
      "YYYY MM DD HH:mm:ss"
    )
  };

  console.log("game object", game);


  // if (!(game.homeTeamId && game.visitorTeamId && game.gameDate)) {
  //   alert("You must enter game date, time and the home and visitor teams");
  //   return;
  // }

  // validation for date
  if (
    !(
      game.homeTeamId &&
      game.visitorTeamId
    )
  ) {
    alert(
      "You must enter a home team and visitor team name"
    );
    return;
  } else if (game.gameDate === "Invalid date") {
    alert("Input a valid Date and Time")
  } else if (game.homeTeamId === game.visitorTeamId) {
    alert("Same teams can not play against each other")
  } else {
    API.savegame(game).then(function () {
      refreshgames();
    });
  }


  $homeTeamSelect.val("");
  $visitorTeamSelect.val("");
  $gameDay.val("");
  $gameTime.val("");
};

// handleDeleteBtnClick is called when a game's delete button is clicked
// Remove the game from the db and refresh the list
var handleDeleteBtnClick = function () {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deletegame(idToDelete).then(function () {
    refreshgames();
  });
};

// A function to get teams and then render our list of teams
function getTeams() {
  $.get("/api/teams", renderTeamList);
}

getTeams();
// Function to either render a list of teams, or if there are none, direct the user to the page
// to create a team first
function renderTeamList(data) {
  if (!data.length) {
    window.location.href = "/teamManager";
  }

  var rowsToAdd1 = [];
  var rowsToAdd2 = [];
  for (var i = 0; i < data.length; i++) {
    rowsToAdd1.push(createTeamRow(data[i]));
    rowsToAdd2.push(createTeamRow(data[i]));
    console.log("data[i] where i is:" + i);
    console.log(data[i]);
  }
  console.log("rowsToAdd1:");
  console.log(rowsToAdd1);
  console.log("rowsToAdd2:");
  console.log(rowsToAdd2);
  console.log("showed the rows");

  $homeTeamSelect.html(rowsToAdd1);
  $visitorTeamSelect.html(rowsToAdd2);
}

// Creates the team options in the dropdown
function createTeamRow(team) {
  var listOption = $("<option>");
  listOption.attr("value", team.id);
  listOption.text(team.teamName);
  return listOption;
}

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$gameList.on("click", ".delete", handleDeleteBtnClick);

refreshgames();