// =====================================================================
//  serie.js
//  Contains code related to Serie page
// =====================================================================


Serie = {
    serie: undefined,
    loadSerie: function(id){
        imdb.getById(id).done(function(data){
            if (data.Response !== undefined && data.Response === 'False'){
                Serie.loadError(data.Error);
            } else {
                console.log(data);
                Serie.serie = data;

                Serie.loadSerieToPage(Serie.serie);

                Serie.loadActionButton();
            }
        })
        .fail(function(error){
            console.log(error);
            Serie.loadError(error.Error);
        });
    },

    loadSerieToPage: function(serie){
        var poster = "img/default-poster.png";
        if (serie.Poster !== "N/A"){
            poster = serie.Poster;
        }
        $('#header').css('background-image', 'url(' + poster + ')');
        $('#title').text(serie.Title);
        $('#year').text(serie.Year);
        $('#released').text(serie.Released);
        $('#runtime').text(serie.Runtime);
        $('#rated').text(serie.Rated);
        $('#genre').text(serie.Genre);
        $('#director').text(serie.Director);
        $('#plot').text(serie.Plot);
        $('#writers').text(serie.Writers);
        $('#actors').text(serie.Actors);
        $('#awards').text(serie.Awards);
        $('#metascore').text(serie.Metascore);
        $('#imdbRating').text(serie.imdbRating);
    },

    loadError: function(errorMessage){
        alert(errorMessage);
    },

    loadActionButton: function(){
        var result = $.grep(UserContent.content.series, function(e){ return e.id == Serie.id; });
        if (result.length == 0) {
            // not found
            $('#action-button').html('<a href="#" id="add" class="link"><i class="icon icon-plus"></i></a>');
            $('#add').click(function() {
                UserContent.addSerie(Serie.serie);
            });
        } else {
            // found one or more items, removing only the first
            $('#action-button').html('<a href="#" id="remove" class="link"><i class="fa fa-times"></i></a>');
            $('#remove').click(function() {
                UserContent.removeSerie(result[0]);
            });
        }
    }
}
