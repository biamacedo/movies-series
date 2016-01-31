// =====================================================================
//  serie.js
//  Contains code related to Serie page
// =====================================================================


Serie = {
    serie: undefined,
    loadSerie: function(id, saved){
        showLoading();
        if(saved === undefined){
            // From Search, necessary to get info from imdb
            console.log('From Search, necessary to get info from imdb');
            imdb.getById(id).done(function(data){
                if (data.Response !== undefined && data.Response === 'False'){
                    hideLoading();
                    Serie.loadError(data.Error);
                } else {
                    console.log(data);
                    Serie.serie = data;
                    Serie.serie.isFavorite = false;

                    Serie.loadSerieToPage(Serie.serie);

                    CommentFunctions.loadComments(Serie.serie.imdbID);

                    // Load User Info to New Comment card
                    $("#newCommentUserName").text(login.user.name);
                    $("#newCommentUserImg").attr('src', login.user.photoUrl);

                    Serie.loadFavoriteActionButton();
                    Serie.loadActionButton();
                    hideLoading();
                }
            })
            .fail(function(error){
                hideLoading();
                console.log(error);
                Serie.loadError(error.Error);
            });
        } else {
            // From Grid, no need to search, already have complete object saved
            console.log('From Grid, no need to search, already have complete object');
            var findElement = _.find(UserContent.content.series, function(item){ return item.imdbID === id; });
            console.log(findElement);
            Serie.serie = findElement;

            Serie.loadSerieToPage(Serie.serie);
            CommentFunctions.loadComments(Serie.serie.imdbID);

            // Load User Info to New Comment card
            $("#newCommentUserName").text(login.user.name);
            $("#newCommentUserImg").attr('src', login.user.photoUrl);

            Serie.loadFavoriteActionButton();
            Serie.loadActionButton();
            hideLoading();
        }
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
        if(serie.Writers !== "") {$('#writers').text(serie.Writers);}
        $('#actors').text(serie.Actors);
        $('#awards').text(serie.Awards);
        $('#metascore').text(serie.Metascore);
        $('#imdbRating').text(serie.imdbRating);
    },

    loadError: function(errorMessage){
        alert(errorMessage);
    },

        loadActionButton: function(){
            var findElement = _.find(UserContent.content.series, function(item){ return item.imdbID === Serie.serie.imdbID; });
            if (findElement === undefined) {
                // not found
                Serie.loadActionAdd();
            } else {
                // found one or more items, removing only the first
                Serie.loadActionRemove(findElement);
            }
        },
        loadActionAdd: function(){
            $('#action-button').html('');

            $('#action-button').html('<a href="#" id="add" class="link"><i class="icon icon-plus"></i></a>');
            $('#add').click(function() {
                UserContent.addSerie(Serie.serie);
                Serie.loadActionRemove(Serie.serie);
                Serie.loadFavoriteActionButton();
            });
        },
        loadActionRemove: function(item){
            $('#action-button').html('');

            $('#action-button').html('<a href="#" id="remove" class="link"><i class="fa fa-times"></i></a>');
            $('#remove').click(function() {
                UserContent.removeSerie(item);
                Serie.loadActionAdd();
                Serie.loadFavoriteActionButton();
            });
        },

        loadFavoriteActionButton: function(){
            console.log('loadFavoriteActionButton');
            var findElement = _.find(UserContent.content.series, function(item){ return item.imdbID === Serie.serie.imdbID; });
            console.log(findElement);
            if (findElement !== undefined){
                if (Serie.serie.isFavorite === false) {
                    // not found
                    Serie.loadFavoriteActionAdd();
                } else {
                    // found one or more items, removing only the first
                    Serie.loadFavoriteActionRemove(findElement);
                }
            } else {
                $('#fav-button').html('');
            }
        },
        loadFavoriteActionAdd: function(){
            $('#fav-button').html('');

            $('#fav-button').html('<a href="#" id="addFavorite" class="link"><i class="fa fa-star-o"></i></a>');
            $('#addFavorite').click(function() {
                UserContent.addFavoriteSerie(Serie.serie);
                Serie.loadFavoriteActionRemove(Serie.serie);
            });
        },
        loadFavoriteActionRemove: function(item){
            console.log('loadFavoriteActionRemove');
            console.log(item);
            $('#fav-button').html('');

            $('#fav-button').html('<a href="#" id="removeFavorite" class="link"><i class="fa fa-star"></i></a>');
            $('#removeFavorite').click(function() {
                UserContent.removeFavoriteSerie(item);
                Serie.loadFavoriteActionAdd();
            });
        }
}
