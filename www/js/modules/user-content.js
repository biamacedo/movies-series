// =====================================================================
//  user-content.js
//  Contains code related user saved content
// =====================================================================

UserContent = {
    content: {
        movies: [],
        series: []
    },
    /* Movie Functions */
    addMovie: function(movie){
        if ($.inArray(movie, UserContent.content.movies) === -1){
            UserContent.content.movies.push(movie);
            Storage.saveUserContent();
            dialog("Movie Added!", "Success");
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
            dialog("Movie Deleted!", "Success");
        } else {
            dialog("Could not find movie to remove!", "Error");
        }
    },
    /* Serie Functions */
    addSerie: function(serie){
        if ($.inArray(serie, UserContent.content.series) === -1){
            UserContent.content.series.push(serie);
            Storage.saveUserContent();
            dialog("Serie Added!", "Success");
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
            dialog("Serie Deleted!", "Success");
        } else {
            dialog("Could not find serie to remove!", "Error");
        }
    }

}
