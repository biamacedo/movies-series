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

        // Parse initialization
        Social.connectToParse();

        // Phisical Back Button Solution
        appReady();

        // // Keyboard In Front of input field solution
        // console.log('Adding Event Focus Out');
        // document.addEventListener('focusout', function(e) {
        //     console.log('Event Focus Out');
        //     window.scrollTo(0, 0);
        //     window.scrollTo(0,document.body.scrollHeight);
        // });
        // console.log('Adding Event Focus In');
        // document.addEventListener('focusin', function(e) {
        //     console.log('Event Focus In');
        //     //window.scrollTo(0,document.body.scrollHeight);
        //
        //     // $('html, body').animate({
        //     //     scrollTop: $("#commentFooterScroll").offset().top
        //     // }, 2000);
        //     scrollAddComments();
        // });
        //
        // console.log('Adding Event showkeyboard and hidekeyboard');
        // document.addEventListener("showkeyboard", function(){ alert("Keyboard is ON"); scrollAddComments();}, false);
        // document.addEventListener("hidekeyboard", function(){ alert("Keyboard is OFF");}, false);
    }
};

app.initialize();
