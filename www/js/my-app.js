// Initialize your app
var myApp = new Framework7({
      init: false, //Disable App's automatica initialization
      swipePanel: 'left',
      material: true
});

// Export selectors engine
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: true
});

// Callbacks to run specific code for specific pages, for example for About page:
myApp.onPageInit('login', function (page) {
    console.log('Login Page Init');
    checkLoginSavedStorage();

    // Logoff button
    document.getElementById("login").addEventListener("click", function(){
        // Logoff code
        login.loginUser();

        // If successiful
        //myApp.loginScreen();
        //changePage('#login', 'slideup');
    });

});

// Callbacks to run specific code for specific pages, for example for About page:
myApp.onPageInit('index', function (page) {
    console.log('Main Page Init');

    // Logoff button
    document.getElementById("logout").addEventListener("click", function(){
        // Logoff code
        login.logoffUser();

        // If successiful
        myApp.loginScreen();
        //changePage('#login', 'slideup');
    });

});

//And now we initialize app
myApp.init();

function checkLoginSavedStorage(){

    console.log('Check if login saved...');
    console.log('Check:' + Storage.check());
    console.log('Check Saved Login:' + Storage.checkSavedLogin());
    console.log('Saved Login Info:' + window.JSON.stringify(Storage.retrieveLogin()));
    if (Storage.check() && Storage.checkSavedLogin()){
        console.log('Login Saved');
        login.user = Storage.retrieveLogin();
		    login.loadUser();

        myApp.closeModal('.login-screen');
        //changePage('#main', 'slidedown');
    }
};

function loginFinish(){
    myApp.closeModal('.login-screen');
}
