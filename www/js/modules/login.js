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
        //  openFB.init({appId: '168233603530137', tokenStore: window.localStorage});
    },

    loadUser: function(){
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
           }
        }, {scope: 'email,public_profile'});

    },

    logoffUser: function(){
        $('#username').text('');
        $('#profile-image').attr("src",'');
        Storage.resetUser();

        openFB.logout(function() {
            login.isLoggedIn = false;
            console.log('Logout successful');
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
