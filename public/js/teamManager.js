// Get references to page elements
var $teamName = $("#team-name");
var $submitBtn = $("#submit");
var $teamList = $("#team-list");

// The API object contains methods for each kind of request we'll make
var API = {
  saveTeam: function(team) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/teams",
      data: JSON.stringify(team)
    });
  },
  getTeams: function() {
    return $.ajax({
      url: "api/teams",
      type: "GET"
    });
  },
  deleteTeam: function(id) {
    return $.ajax({
      url: "api/teams/" + id,
      type: "DELETE"
    });
  }
};

// refreshTeams gets new teams from the db and repopulates the list
var refreshTeams = function() {
  API.getTeams().then(function(data) {
    var $teams = data.map(function(team) {
      var $a = $("<a>")
        .text(team.name)
        .attr("href", "/api/teams/" + team.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": team.id
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.append($button);

      return $li;
    });

    $teamList.empty();
    $teamList.append($teams);
  });
};



// handleFormSubmit is called whenever we submit a new team
// Save the new team to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();

  var team = {
    name: $teamName.val().trim()
  };

  if (!team.name) {
    alert("You must enter a team name");
    return;
  }

  API.saveTeam(team).then(function() {
    refreshTeams();
  });

  $teamName.val("");
};

// handleDeleteBtnClick is called when a team's delete button is clicked
// Remove the team from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteTeam(idToDelete).then(function() {
    refreshTeams();
  });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$teamList.on("click", ".delete", handleDeleteBtnClick);

refreshTeams();
