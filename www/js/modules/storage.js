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
    saveLogin: function(){
        console.log('Saving login to Storage')
        var userStr = window.JSON.stringify(login.user);
        console.log(userStr);
        Storage.storage.setItem("user", userStr);
    },
    retrieveLogin: function (){
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
    }
}
