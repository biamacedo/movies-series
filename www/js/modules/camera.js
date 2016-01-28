

Camera = {
    // getPicture(){
    //     function onSuccess(imageData) {
    //         var image = document.getElementById('myImage');
    //         image.src = ;
    //         return "data:image/jpeg;base64," + imageData;
    //     }
    //
    //     function onFail(message) {
    //         alert('Failed because: ' + message);
    //     };
    //
    //     navigator.camera.getPicture(onSuccess, onFail, { quality: 50,
    //         destinationType: Camera.DestinationType.DATA_URL
    //     });
    // }

    getPicture2: function(options) {
          var q = Q.defer();

          navigator.camera.getPicture(function(result) {
            // Do any magic you need
            q.resolve(result);
          }, function(err) {
            q.reject(err);
          }, options);

          return q.promise;
        }
}
