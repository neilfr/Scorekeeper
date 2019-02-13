// Get references to page elements
var $playerFirstName = $("#player-firstName");
var $playerLastName = $("#player-lastName");
var $playerJerseyNumber = $("#player-jerseyNumber");
var $submitBtn = $("#submit");
var $playerList = $("#player-list");
var $teamSelect = $("#team");

// The API object contains methods for each kind of request we'll make
var API = {
  saveplayer: function (player) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/players",
      data: JSON.stringify(player)
    });
  },
  getplayers: function () {
    return $.ajax({
      url: "api/players",
      type: "GET"
    });
  },
  deleteplayer: function (id) {
    return $.ajax({
      url: "api/players/" + id,
      type: "DELETE"
    });
  }
};

// refreshplayers gets new players from the db and repopulates the list
var refreshplayers = function () {
  API.getplayers().then(function (data) {
    var $players = data.map(function (player) {
      console.log(player);
      var $a = $("<a>")
        .text(
          player.firstName +
          " " +
          player.lastName +
          ", Jersey:" +
          player.jerseyNumber +
          ", Team:" +
          player.Team.teamName
        )
        .attr("href", "/api/players/" + player.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": player.id
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.append($button);

      return $li;
    });

    $playerList.empty();
    $playerList.append($players);
  });
};

// handleFormSubmit is called whenever we submit a new player
// Save the new player to the db and refresh the list
var handleFormSubmit = function (event) {
  event.preventDefault();

  var player = {
    firstName: $playerFirstName.val().trim(),
    lastName: $playerLastName.val().trim(),
    jerseyNumber: $playerJerseyNumber.val().trim(),
    TeamId: $teamSelect.val() //WHY IS THE FIELD CAPITALIZED IN THE DATABASE!!!!!
  };

  if (
    !(
      player.firstName &&
      player.lastName &&
      player.jerseyNumber &&
      player.TeamId
    )
  ) {
    alert(
      "You must enter a player's first name, last name, description and pick a team"
    );
    return;
  } else if (isNaN(player.jerseyNumber)) {
    alert("Input a valid Jersey number")
  } else {
    API.saveplayer(player).then(function () {
      refreshplayers();
    });
  }


  $playerFirstName.val("");
  $playerLastName.val("");
  $playerJerseyNumber.val("");
  $teamSelect.val("");
};

// handleDeleteBtnClick is called when a player's delete button is clicked
// Remove the player from the db and refresh the list
var handleDeleteBtnClick = function () {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteplayer(idToDelete).then(function () {
    refreshplayers();
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

  var rowsToAdd = [];
  for (var i = 0; i < data.length; i++) {
    rowsToAdd.push(createTeamRow(data[i]));
    console.log("data[i] where i is:" + i);
    console.log(data[i]);
  }
  $teamSelect.empty();
  $teamSelect.append(rowsToAdd);
}

// Creates the author options in the dropdown
function createTeamRow(team) {
  var listOption = $("<option>");
  listOption.attr("value", team.id);
  listOption.text(team.teamName);
  return listOption;
}

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$playerList.on("click", ".delete", handleDeleteBtnClick);

refreshplayers();