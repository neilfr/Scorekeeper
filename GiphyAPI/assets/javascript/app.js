//Creates the topics array.  In this case the topics is animals.
var topics = ['cat', 'dog', 'mouse'];

window.onload = function () {
    //Creates the buttons upon initial load.
    renderButtons()
};

// Creates a button at the top of the page for every elements of the topics 
// array. i.e. 1 button per animal name.
function renderButtons() {

    //Clears the buttons section
    $("#buttons").empty();
    
    //Loop through the topics array and create the buttons
    for (i = 0; i < topics.length; i++) {
        var btn = $("<button>");
        //Sets the data-animal attribute to the element in the topics array.  
        //This will be used upon click to identify the button that was clicked.
        btn.attr("data-animal", topics[i]);
        //Sets the class for the buttons.  btn-info is blue.
        btn.addClass("buttons btn btn-info");
        //Sets the button text to the element in the topics array.
        btn.text(topics[i]);
        $("#buttons").append(btn);
    }

    //Sets the onclick event to the newly created button
    $("button").on("click", function () {
        //Retrieve the data-animal attribute from the button clicked.
        var animal = $(this).attr("data-animal");

        //Create the query string for AJAX.
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            animal + "&api_key=a384HNqs84h74YB4YqRBw48a61eThTGS&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            //The object returns is an array named "data" 
            //Store the array in a variable named results.  
            results = response.data;
            //Loop through the array object.
            for (var i = 0; i < results.length; i++) {
                //Sets up the tabular formatting 
                var $animalDivRow = $("<div>");
                $animalDivRow.addClass("row");
                
                var $animalDiv = $("<div>");
                $animalDiv.addClass("col-lg-4 card ");
    
                var  $animalTagsDiv = $("<div>");
                $animalTagsDiv.addClass("col-lg-8 card text-left");

                var $animalImage = $("<img>");
                //Retrieves the "still" (non animated image from the object
                $animalImage.attr("src", results[i].images.fixed_height_still.url);
                '
                
                $animalImage.attr("data-state", "still");
                $animalImage.attr("data-still", results[i].images.fixed_height_still.url);
                $animalImage.attr("data-animate", results[i].images.fixed_height.url);
                $animalImage.attr("id", "animal-img");
                $animalDiv.append($animalImage);

                $animalTagsDiv.append("Title: " + results[i].title + "<br>");
                $animalTagsDiv.append("Rating: " + results[i].rating + "<br>");
                $animalTagsDiv.append("Image Type: " + results[i].type + "<br>");
                $animalTagsDiv.append("Source: " + results[i].source + "<br>");
                $animalTagsDiv.append("Still image: " + results[i].images.fixed_height_still.url + "<br>");
                $animalTagsDiv.append("Animated image: " + results[i].images.fixed_height.url + "<br>");
                 
                $animalDivRow.append($animalDiv);
                $animalDivRow.append($animalTagsDiv);

                $("#gifs-appear-here").append($animalDivRow);
                   
                


            } // End of For loop
            
            $("img").on("click", function () {
      
                if ($(this).attr("data-state") === "still") {
                    $(this).attr("data-state", "animate");
                    $(this).attr("src", $(this).attr("data-animate"));

                } else {
                    $(this).attr("data-state", "still");
                    $(this).attr("src", $(this).attr("data-still"));

                }

            });

        }); //End of Then

    }); // End of onClick

} // End of renderButtons function

//Add the input text as a button.
$("#add-animal").on("click", function (event) {
    event.preventDefault();

    // This line grabs the input from the textbox
    var animal = $("#input-animal").val().trim();

    // The movie from the textbox is then added to our array
    topics.push(animal);

    // Calling renderButtons which handles the processing of our movie array
    renderButtons();
});

$("#clear-gifs").on("click", function (event) {
    event.preventDefault();

    $("#gifs-appear-here").empty();
});