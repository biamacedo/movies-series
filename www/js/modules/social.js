// =====================================================================
//  social.js
//  Contains code related to Social page
// =====================================================================

Social = {
    connectToParse: function(){
        console.log('initializing Parse');
        Parse.initialize("X6l2ixpKLX6b59az15l4a4I2sFekkE5i5lsfMvLy", "CMuR8PqfzpfBArd6IgotkR4A70bpXbyXAiirpwdd");
    },
    retrieveComments: function(id){
        var Comment = Parse.Object.extend("Comment");
        var query = new Parse.Query(Comment);
        query.equalTo("commentItemId", id);
        query.descending("createdAt");
        return query.find();
    },
    insertNewComment(commentItemId, commentText, user, commentImages){
        var commentUserId = user.id;
        var commentUserName = user.name;
        var commentUserImg = user.photoUrl;

        var Comment = Parse.Object.extend("Comment");
        var newComment = new Comment();

        newComment.set("commentItemId", commentItemId);
        newComment.set("commentText", commentText);
        newComment.set("commentUserId", commentUserId);
        newComment.set("commentUserName", commentUserName);
        newComment.set("commentUserImg", commentUserImg);

        _.each(commentImages, function(imageBase64){
            var imageFile = new Parse.File(user.id + commentItemId + "-commentImage.txt", { base64: imageBase64 });
            //newComment.add("commentImages", imageFile);
            newComment.set("commentImages", imageFile);
        });


        return newComment.save();
    }
}
