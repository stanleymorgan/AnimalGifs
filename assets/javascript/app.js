var animals = ["dog", "cat", "chicken", "cow", "pig", "turkey", "horse", "goat", "sheep"];

//function to display buttons
	 
	function showButtons(){ 

		// Deletes the buttons prior to adding new buttons
		$("#buttonDisplay").empty();

		// Loops through the array of animals
		for (var i = 0; i < animals.length; i++){

			// Then dynamicaly generates buttons for each animal in the array
			// Note the jQUery syntax here... 
		    var a = $('<button>') // This code $('<button>') is all jQuery needs to create the beginning and end tag. (<button></button>)
		    a.addClass('animal'); // Added a class 
		    a.attr('data-name', animals[i]); // Added a data-attribute
		    a.text(animals[i]); // Provided the initial button text
		    a.attr("data-state", "still");
		    $('#buttonDisplay').append(a); // Added the button to the HTML
		}
	}
		showButtons();

		// function to add a new button
	$('#addAnimal').on('click', function(){

		// This line of code will grab the input from the textbox
		var newAnimal = $('#animal-input').val().trim();

		// The animal from the textbox is then added to the animals array
		animals.push(newAnimal);
		
		// run the function to show the buttons
		showButtons();

		// We have this line so that users can hit "enter" instead of clicking on ht button and it won't move to the next page
		return false;
	});
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	    // Adding click event listen listener to all buttons
    $("button").on("click", function() {
      // Grabbing and storing the data-name property value from the button
      var animal = $(this).attr("data-name");

      // Constructing a queryURL using the animal name
      var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
        animal + "&api_key=dc6zaTOxFJmzC&limit=10";

      // Performing an AJAX request with the queryURL
      $.ajax({
          url: queryURL,
          method: "GET"
        })
        // After data comes back from the request
        .done(function(response) {
          
          // storing the data from the AJAX request in the results variable
          var results = response.data;

          // Looping through each result item
          for (var i = 0; i < results.length; i++) {

            // Creating and storing a div tag
            var animalDiv = $("<div>");

            // Creating a paragraph tag with the result item's rating
            var p = $("<p>").text("Rating: " + results[i].rating);

            // Creating and storing an image tag
            var animalImage = $("<img>");
            // Setting the src attribute of the image to a property pulled off the result item
            animalImage.attr("src", results[i].images.fixed_height.url);

            // Appending the paragraph and image tag to the animalDiv
            animalDiv.append(p);
            animalDiv.append(animalImage);
             $(this).attr("data-state", "still");
            // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
            $("#gifDisplay").prepend(animalDiv);
          }
        });
    });
/////////////////////////////////////////////////////////////////////////
	 $(".animal").on("click", function() {
      
      var state = $(this).attr("data-state");
      // If the clicked image's state is still, update its src attribute to what its data-animate value is.
      // Then, set the image's data-state to animate
      // Else set src to the data-still value
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    });
	 /////////////////////////////////////////////////////////////////////////////////////////////////
	 
 