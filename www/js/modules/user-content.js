// =====================================================================
//  user-content.js
//  Contains code related user saved content
// =====================================================================

UserContent = {
    content: {
        movies: [],
        series: []
    },

    resetUserContent: function(){
        Storage.resetUserContent();
        UserContent.content = { movies: [], series: []};
        Storage.saveUserContent();
    },
    /* Movie Functions */
    addMovie: function(movie){
        var findElement = _.find(UserContent.content.movies, function(item){ return item.imdbID === movie.imdbID; });
        console.log('Found Element' + findElement);
        if (findElement === undefined){
            movie.isFavorite = false;
            UserContent.content.movies.push(movie);
            Storage.saveUserContent();
            Toast.showLongCenter('Movie Added!');
        } else {
            dialog("You cannot add the same movie twice!", "Error");
        }
    },
    removeMovie: function(movie){
        var findElement = _.find(UserContent.content.movies, function(item){ return item.imdbID === movie.imdbID; });
        console.log(findElement);
        if (findElement !== undefined){
            console.log('Element Found: ' + window.JSON.stringify(findElement));
            // Delete element from array
            var moviesFiltered = _.filter(UserContent.content.movies, function(item){ return item.imdbID !== movie.imdbID; });
            console.log('Element Deleted: ' + window.JSON.stringify(moviesFiltered));
            UserContent.content.movies = moviesFiltered;
            Storage.saveUserContent();
            Toast.showLongCenter('Movie Deleted!');
        } else {
            dialog("Could not find movie to remove!", "Error");
        }
    },
    /* Serie Functions */
    addSerie: function(serie){
        var findElement = _.find(UserContent.content.series, function(item){ return item.imdbID === serie.imdbID; });
        console.log(findElement);
        if (findElement === undefined){
            serie.isFavorite = false;
            UserContent.content.series.push(serie);
            Storage.saveUserContent();
            Toast.showLongCenter('Serie Added!');
        } else {
            dialog("You cannot add the same serie twice!", "Error");
        }
    },
    removeSerie: function(serie){
        var findElement = _.find(UserContent.content.series, function(item){ return item.imdbID === serie.imdbID; });
        console.log(findElement);
        if (findElement !== undefined){
            console.log('Element Found: ' + window.JSON.stringify(findElement));
            // Delete element from array
            var seriesFiltered = _.filter(UserContent.content.series, function(item){ return item.imdbID !== serie.imdbID; });
            console.log('Element Deleted: ' + window.JSON.stringify(seriesFiltered));
            UserContent.content.series = seriesFiltered;
            Storage.saveUserContent();
            Toast.showLongCenter('Serie Deleted!');
        } else {
            dialog("Could not find serie to remove!", "Error");
        }
    },
    // Favorite Script //
    addFavoriteMovie: function(movie){
        var elementIndex = _.findIndex(UserContent.content.movies, function(item){ return item.imdbID === movie.imdbID; });
        console.log('Found Element at: ' + elementIndex);
        if (elementIndex !== -1){
            UserContent.content.movies[elementIndex].isFavorite = true;
            UserContent.sortMovies();
            Toast.showLongCenter('Movie added to Favorites!');
        } else {
            dialog("Movie not Found!", "Error");
        }
    },
    removeFavoriteMovie: function(movie){
        var elementIndex = _.findIndex(UserContent.content.movies, function(item){ return item.imdbID === movie.imdbID; });
        console.log('Found Element at: ' + elementIndex);
        if (elementIndex !== -1){
            UserContent.content.movies[elementIndex].isFavorite = false;
            UserContent.sortMovies();
            Toast.showLongCenter('Movie removed to Favorites!');
        } else {
            dialog("Movie not Found!", "Error");
        }
    },
    addFavoriteSerie: function(serie){
        var elementIndex = _.findIndex(UserContent.content.series, function(item){ return item.imdbID === serie.imdbID; });
        console.log('Found Element at: ' + elementIndex);
        if (elementIndex !== -1){
            UserContent.content.series[elementIndex].isFavorite = true;
            UserContent.sortSeries();
            Toast.showLongCenter('Serie added to Favorites!');
        } else {
            dialog("Serie not Found!", "Error");
        }
    },
    removeFavoriteSerie: function(serie){
        var elementIndex = _.findIndex(UserContent.content.series, function(item){ return item.imdbID === serie.imdbID; });
        console.log('Found Element at: ' + elementIndex);
        if (elementIndex !== -1){
            UserContent.content.series[elementIndex].isFavorite = false;
            UserContent.sortSeries();
            Toast.showLongCenter('Serie removed from Favorites!');
        } else {
            dialog("Serie not Found!", "Error");
        }
    },

    sortMovies(){
        UserContent.content.movies = _.sortBy(UserContent.content.movies, function(item){
            return !item.isFavorite; // Reverse so Favorite items are on top
        });
        Storage.saveUserContent();
    },
    sortSeries(){
        UserContent.content.series = _.sortBy(UserContent.content.series, function(item){
            return !item.isFavorite;
        });
        Storage.saveUserContent();
    }

}
