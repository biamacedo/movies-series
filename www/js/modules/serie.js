// =====================================================================
//  serie.js
//  Contains code related to Serie page
// =====================================================================


Serie = {
    serie: undefined,
    loadSerie: function(id){
        showLoading();
        imdb.getById(id).done(function(data){
            if (data.Response !== undefined && data.Response === 'False'){
                hideLoading();
                Serie.loadError(data.Error);
            } else {
                console.log(data);
                Serie.serie = data;

                Serie.loadSerieToPage(Serie.serie);

                Serie.loadActionButton();
                hideLoading();
            }
        })
        .fail(function(error){
            hideLoading();
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
            Serie.loadActionAdd();
        } else {
            // found one or more items, removing only the first
            Serie.loadActionRemove(result);
        }
    },

    loadActionAdd: function(){
        $('#action-button').html('');

        $('#action-button').html('<a href="#" id="add" class="link"><i class="icon icon-plus"></i></a>');
        $('#add').click(function() {
            UserContent.addSerie(Serie.serie);
            Serie.loadActionRemove();
        });
    },

    loadActionRemove: function(result){
        $('#action-button').html('');

        $('#action-button').html('<a href="#" id="remove" class="link"><i class="fa fa-times"></i></a>');
        $('#remove').click(function() {
            UserContent.removeSerie(result[0]);
            Serie.loadActionAdd();
        });
    },

    loadComments: function(){
        Social.retrieveComments(Serie.serie.imdbID).then(function(results) {
            console.log("Successfully retrieved " + results.length + " comments.");

            $("#commentList").html("");

            if (results.length <= 0){
                var message = '  <li class="card">\
                                        <div class="card-content">\
                                            <div class="card-content-inner">\
                                                <p>No comments yet. Be the first to comment!</p>\
                                            </div>\
                                        </div>\
                                    </li>'

                $("#commentList").html(message);
            } else {
                $.each(results, function(i, object) {
                    console.log(object);

                    var commentCreatedAt = object.get('createdAt');

                    var A_WEEK_OLD = moment().clone().subtract(7, 'days').startOf('day');

                    var isWithinAWeek = moment(commentCreatedAt).isAfter(A_WEEK_OLD);
                    if(isWithinAWeek){
                        var commentCreatedAtStr = moment(commentCreatedAt).fromNow();
                    } else {
                        var commentCreatedAtStr = moment(commentCreatedAt).format('MMMM Do YYYY | HH:mm:ss');
                    }

                    var newComment = '  <li class="card facebook-card">\
                                            <div class="card-header">\
                                                <div class="facebook-avatar"><img src="' + object.get('commentUserImg') + '"></div>\
                                                <div class="facebook-name">' + object.get('commentUserName') + '</div>\
                                                <div class="facebook-date">' + commentCreatedAtStr + '</div>\
                                            </div>\
                                            <div class="card-content">\
                                                <div class="card-content-inner">\
                                                    <p>' + object.get('commentText') + '</p>\
                                                </div>\
                                            </div>\
                                        </li>'

                    $("#commentList").append(newComment);
                });
            }
        }, function(error){
            console.log(error);

            var errorMessage = '  <li class="card">\
                                    <div class="card-content">\
                                        <div class="card-content-inner">\
                                            <p>Could not load comments because of error: ' + error.message + '</p>\
                                        </div>\
                                    </div>\
                                </li>'

            $("#commentList").html(errorMessage);
        });

    },
    sendComment: function(){
        showLoading();
        var commentText = $("#inputCommentText").val();
        if (commentText === "") {
            dialog("Please type a comment before sending!", "Missing comment");
        } else {
            Social.insertNewComment(Serie.serie.imdbID, commentText, login.user).then(function(newComment){
                // Execute any logic that should take place after the object is saved.
                console.log('New comment created with comment id: ' + newComment.id);
                $("#commentText").text("");
                hideLoading();
                dialog('Sent Comment Successfully!', "New Comment");
                Serie.loadComments();
            }, function(gameScore, error) {
                // Execute any logic that should take place if the save fails.
                // error is a Parse.Error with an error code and message.
                hideLoading();
                alert('Failed to send comment, with error code: ' + error.message);
            });
        }
    },
}
