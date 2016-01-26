// =====================================================================
//  user-content.js
//  Contains code related user saved content
// =====================================================================

UserContent = {
    content: {
        movies: [],
        series: []
    },
    addMovie: function(movie){
        if ($.inArray(movie, UserContent.content.movies) === -1){
            UserContent.content.movies.push(movie);
            Storage.saveUserContent();
        }
    },

    addSerie: function(serie){
        if ($.inArray(movie, UserContent.content.series) === -1){
            UserContent.content.series.push(serie);
            Storage.saveUserContent();
        }
    }

}
