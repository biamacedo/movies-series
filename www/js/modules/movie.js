// =====================================================================
//  movie.js
//  Contains code related to Movie page
// =====================================================================


Movie = {
    movie: undefined,
    loadMovie: function(id, saved){
        showLoading();
        if(saved === undefined){
            // From Search, necessary to get info from imdb
            console.log('From Search, necessary to get info from imdb');
            imdb.getById(id).done(function(data){
                if (data.Response !== undefined && data.Response === 'False'){
                    hideLoading();
                    Movie.loadError(data.Error);
                } else {
                    console.log(data);
                    Movie.movie = data;

                    Movie.loadMovieToPage(Movie.movie);

                    Movie.loadActionButton();
                    hideLoading();
                }
            })
            .fail(function(error){
                hideLoading();
                console.log(error);
                Movie.loadError(error.Error);
            });
        } else {
            // From Grid, no need to search, already have complete object saved
            console.log('From Grid, no need to search, already have complete object');
            var findElement = _.find(UserContent.content.movies, function(item){ return item.imdbID === id; });
            console.log(findElement);
            Movie.movie = findElement;

            Movie.loadMovieToPage(Movie.movie);
            Movie.loadActionButton();
            hideLoading();
        }
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
        var findElement = _.find(UserContent.content.movies, function(item){ return item.imdbID === Movie.movie.imdbID; });
        if (findElement === undefined) {
            // not found
            Movie.loadActionAdd();
        } else {
            // found one or more items, removing only the first
            Movie.loadActionRemove(findElement);
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
    loadActionRemove: function(item){
        $('#action-button').html('');

        $('#action-button').html('<a href="#" id="remove" class="link"><i class="fa fa-times"></i></a>');
        $('#remove').click(function() {
            UserContent.removeMovie(item);
            Movie.loadActionAdd();
        });
    }//,

    // loadComments: function(){
    //     moment =
    //
    //     var commentDate = moment().format('MMMM Do YYYY, h:mm:ss a');
    //
    //     var newComment = '  <li class="card facebook-card">\
    //                             <div class="card-header">\
    //                                 <div class="facebook-avatar"><img src="http://graph.facebook.com/v2.5/1239672379379876/picture?width=100&height=100"></div>\
    //                                 <div class="facebook-name">' + user.name + '</div>\
    //                                 <div class="facebook-date">' + commentDate + '</div>\
    //                             </div>\
    //                             <div class="card-content">\
    //                                 <div class="card-content-inner">\
    //                                     <p id="commentText">This movie sucks!!!</p>\\
    //                                 </div>\
    //                             </div>\
    //                         </li>'
    // }
}
