
var animals = ['dog','cat','bird'];


function renderButtons(){ 
    $('#buttonsArea').empty();

 ///loops
    for (var i = 0; i < animals.length; i++){
    
        var a = $('<button>') 
        a.addClass('animals'); 
        a.attr('data-name', animals[i]); 
        a.text(animals[i]); 
        $('#buttonsArea').append(a); 
  }
}

 
  $('#submit').on('click', function(e){
    e.preventDefault();
    var animal = $("#search-input").val().trim();

    animals.push(animal);
    
    renderButtons();
  });
  $(document).on("click", ".animals", function() {
        $('#searches').empty();

        var animal = $(this).attr('data-name');

        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=dc6zaTOxFJmzC&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        })
        .done(function (response) {
            var results = response.data;
            for (var i = 0; i < results.length; i++) {


                var animalImage = $('<img>');
                animalImage.attr('src', results[i].images.fixed_height_still.url);
                animalImage.attr('data-still', results[i].images.fixed_height_still.url);
                animalImage.attr('data-animate', results[i].images.fixed_height.url);
                animalImage.attr('data-state', 'still');
                animalImage.addClass('animalImage');
                $('#searches').append(animalImage);
            }
        })
    });

