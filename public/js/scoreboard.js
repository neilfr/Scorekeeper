$("#view-scoreboard").on("click", function (event) {
  event.preventDefault();

  $.get("/api/games", function (data) {
    console.log("data is", data);
    var i; //counter variable
    var j; //counter variable

    for (i = 0; i < data.length; i++) {
      var homeTeamID = data[i].homeTeamId;
      var visitorTeamID = data[i].visitorTeamId;

      var homeTeamGoals = 0;
      var visitorTeamGoals = 0;

      //Sets up the tabular formatting

      var $gameDivRow = $("<div>");
      $gameDivRow.addClass("row");

      var $gameDiv = $("<div>");
      $gameDiv.addClass("col-lg-12 card ");

      var $gameInfoDiv = $("<div>");
      $gameInfoDiv.addClass("col-lg-12 card text-left");

      var $gameHomeTeamPlayerGoalsDiv = $("<div>");
      $gameHomeTeamPlayerGoalsDiv.addClass("col-lg-12 card text-left");

      var $gameVisitorTeamPlayerGoalsDiv = $("<div>");
      $gameVisitorTeamPlayerGoalsDiv.addClass("col-lg-12 card text-left");

      var $gameHomeTeamNameDiv = $("<div>");
      $gameHomeTeamNameDiv.addClass("col-lg-12 card text-left");

      var $gameVisitorTeamNameDiv = $("<div>");
      $gameVisitorTeamNameDiv.addClass("col-lg-12 card text-left");

      var $gameHomeTeamScoreDiv = $("<div>");
      $gameHomeTeamScoreDiv.addClass("col-lg-12 card text-left");

      var $gameVisitorTeamScoreDiv = $("<div>");
      $gameVisitorTeamScoreDiv.addClass("col-lg-12 card text-left");

      //Retrieves various properties from the object and appends them to the div that
      //displays the properties.

      for (j = 0; j < data[i].Goals.length; j++) {
        if (homeTeamID === data[i].Goals[j].TeamId) {
          homeTeamGoals++;

          if (homeTeamID === data[i].Goals[j].Player.TeamId) {
            $gameHomeTeamPlayerGoalsDiv.append(
              "Goal: #" +
              data[i].Goals[j].Player.jerseyNumber +
              " " +
              data[i].Goals[j].Player.firstName +
              " " +
              data[i].Goals[j].Player.lastName +
              " " +
              moment(new Date(data[i].Goals[j].goalTime)).format(
                "h:mm:ss a"
              ) +
              "<br>"
            );
          }
        } else if (visitorTeamID === data[i].Goals[j].TeamId) {
          visitorTeamGoals++;

          if (visitorTeamID === data[i].Goals[j].Player.TeamId) {
            $gameVisitorTeamPlayerGoalsDiv.append(
              "Goal: #" +
              data[i].Goals[j].Player.jerseyNumber +
              " " +
              data[i].Goals[j].Player.firstName +
              " " +
              data[i].Goals[j].Player.lastName +
              " " +
              moment(new Date(data[i].Goals[j].goalTime)).format(
                "h:mm:ss a"
              ) +
              "<br>"
            );
          }
        }
      }

      $gameInfoDiv.append(
        "<b>Game Date: </b> " +
        moment(new Date(data[i].gameDate)).format("MMMM Do YYYY h:mm a") +
        "<br><br>"
      );

      $gameHomeTeamNameDiv.html(
        "<b>Team: " + data[i].HomeTeam.teamName + " ( Home ) </b>"
      );

      $gameHomeTeamScoreDiv.html("<b>Goals: " + homeTeamGoals + "</b>");

      $gameVisitorTeamNameDiv.html(
        "<b>Team: " + data[i].VisitorTeam.teamName + " ( Visitor ) </b>"
      );

      $gameVisitorTeamScoreDiv.html("<b>Goals: " + visitorTeamGoals + "</b>");

      $gameDiv.append($gameInfoDiv);
      $gameDiv.append($gameHomeTeamNameDiv);
      $gameDiv.append($gameHomeTeamScoreDiv);
      $gameDiv.append($gameHomeTeamPlayerGoalsDiv);
      $gameDiv.append($gameVisitorTeamNameDiv);
      $gameDiv.append($gameVisitorTeamScoreDiv);
      $gameDiv.append($gameVisitorTeamPlayerGoalsDiv);

      $gameDivRow.append($gameDiv);

      //Appends the row to the section that diplays the scoreboard.
      $("#scores-appear-here").append($gameDivRow);
      $("#scores-appear-here").append("<br>");
    }
  });
});

$("#view-todays-games").on("click", function (event) {
  event.preventDefault();

  $.get("/api/gamesbydate/today", function (data) {
    console.log(data);
  });
});