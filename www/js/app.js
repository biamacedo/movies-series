var app = {
    initialize: function() {
        this.bindEvents();
    },
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    onDeviceReady: function() {

        // Loading FastClick
        $(function() {
            FastClick.attach(document.body);
        });

        // Error Dialogs
        if (navigator.notification) { // Override default HTML alert with native dialog
            console.log('Dialog Alert Activated');
            window.alert = function (message) {
                navigator.notification.alert(
                    message,    // message
                    null,       // callback
                    "Error", // title
                    'OK'        // buttonName
                );
            };
        }

        Social.connectToParse();

        appReady();
    }
};

app.initialize();
