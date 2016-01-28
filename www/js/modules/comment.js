


CommentFunctions = {
    loadComments: function(itemImdbID){
        showLoading();
        Social.retrieveComments(itemImdbID).then(function(results) {
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
                hideLoading();
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

                    // Limited to one image only
                    var imagesHtml = '';
                    var commentImages = object.get('commentImages');
                    console.log(commentImages);
                    if (commentImages !== undefined){
                        console.log('Adding 1 image');
                        var newImg = '<img src="' + commentImages.url() + '" width="100%">';
                        imagesHtml = imagesHtml + newImg;
                        console.log(imagesHtml);
                    }
                    // No Multiple images at the moment, limited to 1
                    // _.each(commentImages, function(image){
                    //     var newImg = '<img src="' + image.url(); + '" width="100%">'
                    //
                    //     imagesHtml = imagesHtml + newImg;
                    // });

                    var commentHtml = '';
                    var commentText = object.get('commentText');
                    if (commentText !== undefined && commentText !== "") {
                        commentHtml = '<p>' + commentText + '</p>'
                    }

                    var newComment = '  <li class="card facebook-card">\
                                            <div class="card-header">\
                                                <div class="facebook-avatar"><img src="' + object.get('commentUserImg') + '"></div>\
                                                <div class="facebook-name">' + object.get('commentUserName') + '</div>\
                                                <div class="facebook-date">' + commentCreatedAtStr + '</div>\
                                            </div>\
                                            <div class="card-content">\
                                                <div class="card-content-inner">\
                                                    ' + commentHtml + '\
                                                    ' + imagesHtml + '\
                                                </div>\
                                            </div>\
                                        </li>'

                    console.log(newComment);

                    $("#commentList").append(newComment);
                });
                hideLoading();
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
            hideLoading();
        });

    },
    sendComment: function(itemImdbID){
        showLoading();

        imageElements = $("#commentCard img");

        var commentImages = []
        imageElements.each(function(){
            commentImages.push($(this).attr('src'));
        });
        console.log(commentImages);

        var commentText = $("#inputCommentText").val();
        if (commentText === "" && commentImages.length === 0) {
            dialog("Please type a comment or add an image before sending!", "Missing comment or image");
            hideLoading();
        } else {
            Social.insertNewComment(itemImdbID, commentText, login.user, commentImages).then(function(newComment){
                // Execute any logic that should take place after the object is saved.
                console.log('New comment created with comment id: ' + newComment.id);
                $("#inputCommentText").val("");
                hideLoading();
                Toast.showLongCenter('Sent Comment Successfully!');
                CommentFunctions.loadComments(itemImdbID);
            }, function(newComment, error) {
                // Execute any logic that should take place if the save fails.
                // error is a Parse.Error with an error code and message.
                hideLoading();
                alert('Failed to send comment, with error code: ' + error);
            });
        }
    },

    totalImages: 0,

    addPhoto: function(){
        console.log('Adding Photo');
        console.log(Camera);
        if (CommentFunctions.totalImages === 1) {
            dialog('You can only add one image a the moment!', 'Limitation');
        } else {
            CameraSensor.getPicture().then(function(imgBase64){
                console.log(imgBase64);

                var newImg = '<img src="' + imgBase64 + '" width="100%">'

                $("#commentCard").append(newImg);

                CommentFunctions.totalImages++;
            });
        }
    }
}
