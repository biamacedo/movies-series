// =====================================================================
//  storage.js
//  Contains code related saving and retrieving data from local storage
// =====================================================================

Storage = {
    storage: window.localStorage,
    check: function(){
        console.log('Check if Storage exists')
        if(typeof Storage.storage !== "undefined") {
            return true;
        } else {
            // Sorry! No Web Storage support..
            return false;
        }
    },
    /* === Storage Login === */
    saveLogin: function(){
        console.log('Saving Login to Storage');
        var userStr = window.JSON.stringify(login.user);
        console.log(userStr);
        Storage.storage.setItem("user", userStr);
    },
    retrieveLogin: function (){
        console.log('Retrieving Login from Storage');
        var userStr = Storage.storage.getItem("user");
        console.log(userStr);
        return window.JSON.parse( userStr );
    },
    checkSavedLogin: function(){
        var userStr = Storage.storage.getItem("user");
        if (typeof userStr !== 'undefined'
         && userStr !== null
         && userStr !== '') {
            return true;
        } else {
            return false;
        }
    },
    resetUser: function(){
        Storage.storage.removeItem("user");
    },
    /* === Storage User Content === */
    saveUserContent: function(){
        console.log('Saving User Content to Storage');
        var userContentStr = window.JSON.stringify(UserContent.content);
        console.log('User Content Saved: ');
        console.log(userContentStr);
        Storage.storage.setItem("userContent-"+login.user.id, userContentStr);
    },
    retrieveUserContent: function (){
        console.log('Retrieving User Content from Storage');
        var userContentStr = Storage.storage.getItem("userContent-"+login.user.id);
        console.log('User Content Saved: ');
        console.log(userContentStr);
        return window.JSON.parse(userContentStr);
    },
    resetUserContent: function(){
        Storage.storage.removeItem("userContent-"+login.user.id);
    },
}
