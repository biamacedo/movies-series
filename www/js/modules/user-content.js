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
        if ($.inArray(movie, UserContent.content.movies) !== -1){
            UserContent.content.movies.splice($.inArray(movie, UserContent.content.movies),1);
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
        if ($.inArray(serie, UserContent.content.series) !== -1){
            UserContent.content.series.splice($.inArray(movie, UserContent.content.series),1);
            Storage.saveUserContent();
            dialog("Serie Deleted!", "Success");
        } else {
            dialog("Could not find serie to remove!", "Error");
        }
    }

}
