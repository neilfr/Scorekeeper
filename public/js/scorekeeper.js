$("#home-team-goal").on("click", function(event) {
  event.preventDefault();
  currentDateTime = new Date();

  /* Change the parameter of 1 later!!! */
  $.get("/api/games/1", function(data) {
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
