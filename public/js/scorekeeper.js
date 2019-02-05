var gamePicked = sessionStorage.getItem("gamePicked");
var timeRemaining = 3000; // 5 minutes for now
var $gameClock = $("#gameClock");
var gameMinutes, gameSeconds, game10ths;
var running = false;

$("#home-team-goal").on("click", function(event) {
  event.preventDefault();
  currentDateTime = new Date();

  /* Changed the parameter to gamePicked */
  $.get("/api/games/" + gamePicked, function(data) {
    console.log(data);

    $.get("/api/teams", function(data) {
      console.log(data);
    });
  });
});

$("#visitor-team-goal").on("click", function(event) {
  event.preventDefault();
  currentDateTime = new Date();

  $.get("/api/games/1", function(data) {
    console.log(data);
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
  if (running) {
    if (--timeRemaining <= 0) {
      clearInterval(countDown);
      $gameClock.text("Game Over");
    }
  }
}, 100);
