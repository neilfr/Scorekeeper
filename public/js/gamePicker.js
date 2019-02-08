// Get references to page elements

//var $gameName = $("#game-name");
var $gameList = $("#game-list");

// The API object contains methods for each kind of request we'll make
var API = {
  getgames: function() {
    return $.ajax({
      url: "api/games",
      //url: "api/gamesbydate/today",
      type: "GET"
    });
  },

  pickGame: function() {
    return $.get("/scorekeeper");
  }
};

// refresh games gets new games from the db and repopulates the list
var refreshgames = function() {
  API.getgames().then(function(data) {
    var $games = data.map(function(game) {
      var $a = $("<a>")
        .text(
          "Home: " +
            game.HomeTeam.teamName +
            ", Visitor: " +
            game.VisitorTeam.teamName +
            " Game Date and Time: " +
            moment(game.gameDate).format("ddd MMM Do YYYY h:mm a")
        )
        .attr("href", "/api/games/" + game.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": game.id
        })
        .append($a);

      var $picker = $("<a>")
        .addClass("btn btn-primary float-right gamePick")
        .attr("href", "/scorekeeper")
        .text("Start this game!");

      $li.append($picker);

      return $li;
    });

    $gameList.empty();
    $gameList.append($games);
  });
};

// handleGamePickBtnClick is called when a game's gamePick button is clicked
// Remove the game from the db and refresh the list
var handleGamePickBtnClick = function() {
  var idPicked = $(this)
    .parent()
    .attr("data-id");
  API.pickGame().then(function() {
    sessionStorage.setItem("gamePicked", idPicked);
  });
};
// Add event listeners to the game selection buttons
$gameList.on("click", ".gamePick", handleGamePickBtnClick);

refreshgames();
