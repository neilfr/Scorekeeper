// Get references to page elements

var $gameName = $("#game-name");
var $gameList = $("#game-list");

// The API object contains methods for each kind of request we'll make
var API = {
  getgames: function() {
    return $.ajax({
      url: "api/games",
      type: "GET"
    });
  },
  pickGame: function(id) {
    return $.ajax({
      url: "api/games/" + id,
      type: "GET"
    });
  },
  inGameManager: function() {
    return $.ajax({
      url: "inGameManager/",
      type: "GET"
    });
  }
};

// refresh games gets new games from the db and repopulates the list
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
        .addClass("btn btn-danger float-right gamePick")
        .text("y");

      $li.append($button);

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

  //CHANGE DELETEGAME TO PICKGAME
  API.pickGame(idPicked).then(function() {
    //    refreshgames();
    console.log("picked a game!!");
    sessionStorage.setItem("gamePicked", idPicked);
    //go to ingame manager
    API.inGameManager();
  });
};
// Add event listeners to the submit and delete buttons
//$submitBtn.on("click", handleFormSubmit);
$gameList.on("click", ".gamePick", handleGamePickBtnClick);

refreshgames();
