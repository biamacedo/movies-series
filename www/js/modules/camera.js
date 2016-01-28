// =====================================================================
//  camera.js
//  Contains code related to camera sensor manipulation
// =====================================================================

CameraSensor = {

    getPicture: function() {
        var q = Q.defer();

        navigator.camera.getPicture(function(imageData) {
            // Do any magic you need
            q.resolve("data:image/jpeg;base64," + imageData);
        }, function(message) {
            q.reject(message);
        }, {    quality: 50,
                destinationType: Camera.DestinationType.DATA_URL
        });

        return q.promise;
    }
};
