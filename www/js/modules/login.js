// =====================================================================
//  login.js
//  Contains code related to the login page
// =====================================================================

login = {
    user: {
        id: undefined,
        name: undefined,
        photoUrl: undefined
    },

    isLoggedIn: false,

    init: function(){
        // Defaults to sessionStorage for storing the Facebook token
        openFB.init({appId: '168233603530137'});

        //  Uncomment the line below to store the Facebook token in localStorage instead of sessionStorage
        // openFB.init({appId: '168233603530137', tokenStore: window.localStorage});
    },

    loadUser: function(){
        console.log('Loading User');
        console.log(login.user);
        $('#username').text(login.user.name);
        $('#profile-image').attr("src",login.user.photoUrl);
    },

    loginUser: function(){
        login.init();

        openFB.login(function(response){
            console.log(response);
            if(response.status === 'connected') {
               console.log('Facebook login succeeded, got access token: ' + response.authResponse.accessToken);
               login.isLoggedIn = true;
               getUserDetails();
               Main.refreshPage();
           } else {
               alert('Facebook login failed: ' + response.error);
               hideLoading();
           }
        }, {scope: 'email,public_profile'});

    },

    checkLoginUser: function(){
        showLoading();
        console.log('Check Login User');
        // openFB.getLoginStatus(function(loginStatus){
        //     // 'connected' = Logged in / 'unknown' = 'Not Logged In'
        //     console.log('Connected to Facebook? ' + loginStatus.status);
        //     if(loginStatus.status === 'connected'){
        //         console.log('Login Saved');

        if (Storage.check() && Storage.checkSavedLogin()){
            console.log('Retrieving Login');
            login.user = Storage.retrieveLogin();
            login.isLoggedIn = true;

            // If saved, retrieving previous user-content and loding it
            var tempUserContent = Storage.retrieveUserContent();
            console.log('Saved UserContent:' + JSON.stringify(tempUserContent));

            if (tempUserContent !== undefined &&
                tempUserContent !== null){
                    console.log('Content Found');
                    UserContent.content = tempUserContent;
            } else {
                console.log('Content does not exist, creating one');
                UserContent.content = UserContent.resetUserContent();
            }

            login.loadUser();

            loginFinish();
        }
        hideLoading();
        //     } else {
        //         console.log('Login Not Saved');
        //         login.isLoggedIn = false;
        //         hideLoading();
        //     }
        // });
    },

    logoffUser: function(){
        console.log('Logoff User!');

        openFB.logout(function() {
            login.isLoggedIn = false;
            console.log('Logout successful');
            $('#username').text('');
            $('#profile-image').attr("src",'');
            Storage.resetUser();
        }, function(error){
            console.log('Error: ' + error.message);
        });
    }
}

/// == FACEBOOK SCRIPT ==  ///

function getUserDetails() {
    console.log('Welcome!  Fetching your information.... ');

    openFB.api({path: '/me', success: function(data) {
        console.log(window.JSON.stringify(data));
        console.log(data);
        console.log('Successful login for: ' + data.name + ' with Id: ' + data.id);
        login.user.id = data.id;
        login.user.name = data.name;
        login.user.photoUrl = 'http://graph.facebook.com/v2.5/' + data.id + '/picture?width=100&height=100';

        console.log(login.user);

        if (Storage.check()){
            Storage.saveLogin();
        }

        login.loadUser();
        loginFinish();
    }, error: function(error){
        console.log('Error: ' + error.message);
    }});

};
