// Get references to page elements
//var $gameText = $("#game-text");
//var $gameDescription = $("#game-description");

var $gameName = $("#game-name");
var $submitBtn = $("#submit");
var $gameList = $("#game-list");
var $homeTeamSelect = $("#homeTeam");
var $visitingTeamSelect = $("#visitingTeam");

// The API object contains methods for each kind of request we'll make
var API = {
  savegame: function(game) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/games",
      data: JSON.stringify(game)
    });
  },
  getgames: function() {
    return $.ajax({
      url: "api/games",
      type: "GET"
    });
  },
  deletegame: function(id) {
    return $.ajax({
      url: "api/games/" + id,
      type: "DELETE"
    });
  }
};

// refreshgames gets new games from the db and repopulates the list
var refreshgames = function() {
  API.getgames().then(function(data) {
    var $games = data.map(function(game) {
      var $a = $("<a>")
        .text(
          game.name +
            ", Home:" +
            game.homeTeamId +
            ", Visitor:" +
            game.visitingTeamId
        )
        .attr("href", "/api/games/" + game.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": game.id
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.append($button);

      return $li;
    });

    $gameList.empty();
    $gameList.append($games);
  });
};

// handleFormSubmit is called whenever we submit a new game
// Save the new game to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();

  var game = {
    name: $gameName.val().trim(),
    homeTeamId: $homeTeamSelect.val(),
    visitingTeamId: $visitingTeamSelect.val()
  };

  if (!(game.name && game.homeTeamId && game.visitingTeamId)) {
    alert("You must enter game name and the home and visiting teams");
    return;
  }

  API.savegame(game).then(function() {
    refreshgames();
  });

  $gameName.val("");
  $homeTeamSelect.val("");
  $visitingTeamSelect.val("");
};

// handleDeleteBtnClick is called when a game's delete button is clicked
// Remove the game from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deletegame(idToDelete).then(function() {
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
  console.log(rowsToAdd2);
  console.log("showed the rows");
  // $homeTeamSelect.empty();
  //  $visitingTeamSelect.empty();

  $homeTeamSelect.html(rowsToAdd1);
  $visitingTeamSelect.html(rowsToAdd2);
}

// Creates the team options in the dropdown
function createTeamRow(team) {
  var listOption = $("<option>");
  listOption.attr("value", team.id);
  listOption.text(team.name);
  return listOption;
}

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$gameList.on("click", ".delete", handleDeleteBtnClick);

refreshgames();
