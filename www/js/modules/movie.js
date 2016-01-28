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
            Movie.loadComments();

            // Load User Info to New Comment card
            $("#newCommentUserName").text(login.user.name);
            $("#newCommentUserImg").attr('src', login.user.photoUrl);

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
    },

    loadComments: function(){
        Social.retrieveComments(Movie.movie.imdbID).then(function(results) {
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
            Social.insertNewComment(Movie.movie.imdbID, commentText, login.user).then(function(newComment){
                // Execute any logic that should take place after the object is saved.
                console.log('New comment created with comment id: ' + newComment.id);
                $("#commentText").text("");
                hideLoading();
                dialog('Sent Comment Successfully!', "New Comment");
                Movie.loadComments();
            }, function(gameScore, error) {
                // Execute any logic that should take place if the save fails.
                // error is a Parse.Error with an error code and message.
                hideLoading();
                alert('Failed to send comment, with error code: ' + error.message);
            });
        }
    }
}
