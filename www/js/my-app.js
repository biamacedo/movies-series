// =====================================================================
//  my-app.js
//  Framework7 main file
// =====================================================================

// Initialize your app
var myApp = new Framework7({
      init: false, //Disable App's automatica initialization
      swipePanel: 'left',
      material: true
});

// Export selectors engine
var $$ = Dom7;

// Add view
mainView = myApp.addView('.view-main', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: true
});

// Callbacks to run specific code for specific pages, for example for About page:
myApp.onPageInit('login', function (page) {
    console.log('Login Page Init');
    login.checkLoginUser();

    // Login button
    document.getElementById("login").addEventListener("click", function(){
        login.loginUser();
    });

});

myApp.onPageInit('index', function (page) {
    console.log('Main Page Init');

    console.log('Is Logged In? ' + login.isLoggedIn);
    if (login.isLoggedIn){
        Main.refreshPage();
    }

    // Logoff button
    document.getElementById("logout").addEventListener("click", function(){
        // Logoff code
        login.logoffUser();

        // If successiful
        myApp.loginScreen();
    });

});

myApp.onPageInit('search', function (page) {
    console.log('Search Page Init');

    // Search Keyboard Enter
    $("#searchForm").submit(function(e){
        e.preventDefault(); // cancel default form submit
        var inputSearch = $("#searchInput").val();
        Search.searchForMovie(inputSearch);
        return false;
    });

});

myApp.onPageInit('movie', function (page) {
    console.log('Movie Page Init');

    $("#commentForm").submit(function(e){
        e.preventDefault(); // cancel default form submit
        CommentFunctions.sendComment(Movie.movie.imdbID);
        return false;
    });

    $("#sendComment").click(function(){
        CommentFunctions.sendComment(Movie.movie.imdbID);
    });

    $("#addPhoto").click(function(){
        CommentFunctions.addPhoto();
    });

    console.log(page.query);

    var id = page.query.id;
    console.log(id);
    var saved = page.query.saved;
    console.log(saved);
    Movie.loadMovie(id, saved);

});

myApp.onPageInit('serie', function (page) {
    console.log('Serie Page Init');

    $("#commentForm").submit(function(e){
        e.preventDefault(); // cancel default form submit
        CommentFunctions.sendComment(Serie.serie.imdbID);
        return false;
    });

    $("#sendComment").click(function(){
        CommentFunctions.sendComment(Serie.serie.imdbID);
    });

    $("#addPhoto").click(function(){
        CommentFunctions.addPhoto();
    });

    console.log(page.query);

    var id = page.query.id;
    console.log(id);
    var saved = page.query.saved;
    console.log(saved);
    Serie.loadSerie(id, saved);

});

//And now we initialize app
myApp.init();


// === Function that can be used anywhere on app ===

function loginFinish(){
    myApp.closeModal('.login-screen');
}


function showLoading(){
    myApp.showIndicator();
}

function hideLoading(){
    myApp.hideIndicator();
}

// Device Back Button Problem //
function appReady(){
    console.log('Adding Back Button Event');
    document.addEventListener("backbutton", function(e){
        var page = myApp.getCurrentView().activePage;
        console.log(page);
        myApp.hidePreloader();
        if(page.name=="index"){
            console.log('At Index');
            e.preventDefault();

            navigator.notification.confirm(
                'Do you want to exit?!', // message
                function(buttonIndex) { // callback to invoke with index of button pressed
                     if(buttonIndex === 1){
                         console.log('Exit confirmed');
                         navigator.app.clearHistory();
                         navigator.app.exitApp();
                     }
                },
                'Exit',           // title
                ['Exit','Back']     // buttonLabels
            );
        } else {
            console.log('Not At Index');
            console.log(navigator.app);
            //mainView.router.back();
        }
    }, false);
}
