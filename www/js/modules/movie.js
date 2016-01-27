// =====================================================================
//  movie.js
//  Contains code related to Movie page
// =====================================================================


Movie = {
    movie: undefined,
    loadMovie: function(id){
        imdb.getById(id).done(function(data){
            if (data.Response !== undefined && data.Response === 'False'){
                Movie.loadError(data.Error);
            } else {
                console.log(data);
                Movie.movie = data;

                Movie.loadMovieToPage(Movie.movie);

                Movie.loadActionButton();
            }
        })
        .fail(function(error){
            console.log(error);
            Movie.loadError(error.Error);
        });
    },

    loadMovieToPage: function(movie){
        var poster = "img/default-poster.png";
        if (movie.Poster !== "N/A"){
            poster = movie.Poster;
        }
        $('#header').css('background-image', 'url(' + poster + ')');
        $('#title').text(movie.Title);
        $('#year').text(movie.Year);
        $('#released').text(movie.Released);
        $('#runtime').text(movie.Runtime);
        $('#rated').text(movie.Rated);
        $('#genre').text(movie.Genre);
        $('#director').text(movie.Director);
        $('#plot').text(movie.Plot);
        $('#writers').text(movie.Writers);
        $('#actors').text(movie.Actors);
        $('#awards').text(movie.Awards);
        $('#metascore').text(movie.Metascore);
        $('#imdbRating').text(movie.imdbRating);
    },

    loadError: function(errorMessage){
        alert(errorMessage);
    },

    loadActionButton: function(){
        var result = $.grep(UserContent.content.movies, function(e){ return e.id == Movie.id; });
        if (result.length == 0) {
            // not found
            Movie.loadActionAdd();
        } else {
            // found one or more items, removing only the first
            Movie.loadActionRemove(result);
        }
    },

    loadActionAdd: function(){
        $('#action-button').html('');

        $('#action-button').html('<a href="#" id="add" class="link"><i class="icon icon-plus"></i></a>');
        $('#add').click(function() {
            UserContent.addMovie(Movie.movie);
            Movie.loadActionRemove();
        });
    },

    loadActionRemove: function(result){
        $('#action-button').html('');

        $('#action-button').html('<a href="#" id="remove" class="link"><i class="fa fa-times"></i></a>');
        $('#remove').click(function() {
            UserContent.removeMovie(result[0]);
            Movie.loadActionAdd();
        });
    }
}
