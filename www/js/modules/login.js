// =====================================================================
//  login.js
//  Contains code related to the login page
// =====================================================================

login = {
    user: {
        name: undefined,
        photoUrl: undefined
    },

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
               getUserDetails();
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
            console.log('Logout successful');
        }, function(error){
            console.log('Error: ' + error.message);
        });
    }
}

/// == FACEBOOK SCRIPT ==  ///
// function readPermissions() {
//         openFB.api({
//             method: 'GET',
//             path: '/me/permissions',
//             success: function(result) {
//                 alert(JSON.stringify(result.data));
//             },
//             error: function(error){
//                 console.log('Error: ' + error.message);
//             }
//         });
//     }

// Here we run a very simple test of the Graph API after login is
// successful.  See statusChangeCallback() for when this call is made.
function getUserDetails() {
    console.log('Welcome!  Fetching your information.... ');
    //
    // FB.api('/me', function(response) {
    //     console.log(window.JSON.stringify(response));
    //     console.log(response);
    //     console.log('Successful login for: ' + response.name);
    //     login.user.name = response.name;
    //
    //     FB.api("/me/picture?width=100&height=100",  function(response) {
    //         console.log(response.data.url);
    //         login.user.photoUrl = response.data.url;
    //
    //         loginFinish();
    //
    //         console.log(login.user);
    //
    //         if (Storage.check()){
    //             Storage.saveLogin();
    //         }
    //         login.loadUser();
    //
    //     });
    // });

    openFB.api({path: '/me', success: function(data) {
        console.log(window.JSON.stringify(data));
        console.log(data);
        console.log('Successful login for: ' + data.name);
        login.user.name = data.name;

        console.log(data);
        console.log(data.id);
        login.user.photoUrl = 'http://graph.facebook.com/v2.5/' + data.id + '/picture?width=100&height=100';

        loginFinish();

        console.log(login.user);

        if (Storage.check()){
            Storage.saveLogin();
        }
        login.loadUser();
    }, error: function(error){
        console.log('Error: ' + error.message);
    }});

};
