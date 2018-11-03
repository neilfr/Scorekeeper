//Creates the topics array.  In this case the topics chosen is animals.
var topics = ['horse', 'chicken', 'sheep'];
//The default number of results your want to retrieve from the API.
var numOfResults = 10;

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
            animal + "&api_key=a384HNqs84h74YB4YqRBw48a61eThTGS&limit=" + numOfResults;

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
                var $imageDivRow = $("<div>");
                $imageDivRow.addClass("row");

                var $imageDiv = $("<div>");
                $imageDiv.addClass("col-lg-4 card ");

                var $imagePropertiesDiv = $("<div>");
                $imagePropertiesDiv.addClass("col-lg-8 card text-left");

                var $image = $("<img>");
                //Retrieves the "still" (non animated image from the object
                $image.attr("src", results[i].images.fixed_height_still.url);
                // Sets the data-state attribute for the image as "still".  The data-state
                // attribute will be used to store the current toggle value of "still"
                // or "animate" depending on user intervention.
                $image.attr("data-state", "still");
                // Sets the data-still attribute to the still image retreived from the object.
                $image.attr("data-still", results[i].images.fixed_height_still.url);
                // Sets the data-still attribute to the animated image retreived from the object.
                $image.attr("data-animate", results[i].images.fixed_height.url);
                // Sets ID.
                $image.attr("id", "animal-img");
                //Appends to the the div that displays the image.
                $imageDiv.append($image);
                //Retrieves various properties from the object and appends them to the div that 
                //displays the properties.
                $imagePropertiesDiv.append("Title: " + results[i].title + "<br>");
                $imagePropertiesDiv.append("Rating: " + results[i].rating + "<br>");
                $imagePropertiesDiv.append("Image Type: " + results[i].type + "<br>");
                $imagePropertiesDiv.append("ID: " + results[i].id + "<br>");
                $imagePropertiesDiv.append("Source: " + results[i].source + "<br>");
                $imagePropertiesDiv.append("Still Image: " + results[i].images.fixed_height_still.url + "<br>");
                $imagePropertiesDiv.append("Still Image Dimensions: " + results[i].images.fixed_height_still.width + "px (w) x " + results[i].images.fixed_height_still.height + "px (h)<br>");
                $imagePropertiesDiv.append("Animated Image: " + results[i].images.fixed_height.url + "<br>");
                $imagePropertiesDiv.append("Animated Image Dimensions: " + results[i].images.fixed_height.width + "px (w) x " + results[i].images.fixed_height.height + "px (h)<br>");
                $imagePropertiesDiv.append("Import Date and Time: " + results[i].import_datetime + "<br>");
                
                //Appends the image div to the main row div
                $imageDivRow.append($imageDiv);

                //Appends the image properties div to the main row div.
                $imageDivRow.append($imagePropertiesDiv);
                //Appends the row to the section that diplays the image and image properties.
                $("#gifs-appear-here").append($imageDivRow);

            } // End of For loop

            //Add the on click event to the images.
            $("img").on("click", function () {

                //If the data state attribute of the image is "still"
                if ($(this).attr("data-state") === "still") {
                    //Set the data state attribute to "animate". 
                    //The data-state attribute is a toggle between "still" and "animate"
                    $(this).attr("data-state", "animate");
                    //Set the image source to the url with the animate image that was set earlier
                    //in the data-animate attribute.
                    $(this).attr("src", $(this).attr("data-animate"));

                }
                //If the data state attribute of the image is not "still" 
                //The only other option is "animate" so this is
                //If the data state attribute of the image is "attribute"
                else {
                    //Set the data state attribute to "still". 
                    //The data-state attribute is a toggle between "still" and "animate"
                    $(this).attr("data-state", "still");
                    //Set the image source to the url with the still image that was set earlier
                    //in the data-still attribute.
                    $(this).attr("src", $(this).attr("data-still"));

                }

            });

        }); //End of Then

    }); // End of onClick

} // End of renderButtons function

//Add the input text as a button upon click of the Add button
$("#add-animal").on("click", function (event) {
    event.preventDefault();
    // This line grabs the input from the textbox
    var animal = $("#input-animal").val().trim();

    if (animal !== '') {

        // The animal name from the textbox is then added to the topics array
        topics.push(animal);

        // Calling renderButtons which handles the processing of the topics array.
        renderButtons();
    }
});

//Clear the current GIFs displayed in the GIF display section upon click of the Clear button.
$("#clear-gifs").on("click", function (event) {
    event.preventDefault();
    //Clears the GIF display section.
    $("#gifs-appear-here").empty();
});