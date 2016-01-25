Movie = {
    movie: undefined,
    getMovie: function(id){
        imdb.getById(id).done(function(data){
            if (data.Response !== undefined && data.Response === 'False'){
                Movie.loadError(data.Error);
            } else {
                console.log(data);
                Movie.movie = data;

                Movie.loadMovieToPage(Movie.movie);
            }
        })
        .fail(function(error){
            console.log(error);
            Movie.loadError(error.Error);
        });
    },

    loadMovieToPage: function(movie){
        $('#header').css('background-image', 'url(' + movie.Poster + ')');
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
    }
}
