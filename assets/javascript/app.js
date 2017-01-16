var animals = ["dog", "cat", "chicken", "cow", "pig", "turkey", "horse", "goat", "sheep"];

//function to display buttons
	 
	function showButtons(){ 

		// Deletes the buttons prior to adding new buttons
		$("#buttonDisplay").empty();
		
		for (var i = 0; i < animals.length; i++){

			 
		    var a = $('<button>') 
		    a.addClass('animal'); // Added a class 
		    a.attr('data-name', animals[i]); // Added a data-attribute
		    a.text(animals[i]); 
		    //a.attr("data-state", "still");
		    $('#buttonDisplay').append(a); // Added the button to the HTML
		}
	}
		showButtons();

		// function to add a new button
	$('#addAnimal').on('click', function(){
				//  grab the input from the textbox
		var newAnimal = $('#animal-input').val().trim();

		// The animal from the textbox is added to the animals array
		animals.push(newAnimal);
		
		// run the function to show the buttons

		showButtons();
		
		return false;
	});
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	    // Adding click event listen listener to all buttons
    $(document).on("click", ".animal" ,function() {
      
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
            animalImage.attr("src", results[i].images.fixed_height_still.url);

            // Appending the paragraph and image tag to the animalDiv
            animalDiv.append(p);
            animalDiv.append(animalImage);
           
            $("#gifDisplay").prepend(animalDiv);
          }
        });
    });
/////////////////////////////////////////////////////////////////////////
	// $("img").on("click", function() {
	  $(document).on("click", "img" ,function() {
      var state = $(this).attr("data-state");
      
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    });
	 /////////////////////////////////////////////////////////////////////////////////////////////////
	 
 