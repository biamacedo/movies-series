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
        UserContent.content.movies.push(movie);
    },

    addSerie: function(serie){
        UserContent.content.series.push(serie);
    }

}
