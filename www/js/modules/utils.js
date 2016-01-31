// =====================================================================
//  utils.js
//  Helpful code
// =====================================================================

/* === Toast Message === */
Toast = {
    // ============================================================
    // You have two choices to make when showing a Toast:
    // where to show it and for how long.
    //
    // show(message, duration, position)
    // duration: 'short', 'long'
    // position: 'top', 'center', 'bottom'
    // You can also use any of these convenience methods:
    //
    // showShortTop(message)
    // showShortCenter(message)
    // showShortBottom(message)
    // showLongTop(message)
    // showLongCenter(message)
    // showLongBottom(message)
    // ============================================================

    showLongCenter: function(message){
        window.plugins.toast.showLongCenter(message);
    },
    showLongBottom: function(message){
        window.plugins.toast.showLongBottom(message);
    },
    showShortTop: function(message){
        window.plugins.toast.showShortTop(message);
    },
    show: function(message, duration, location){
        // Ex: 'Hello there!', 'long', 'center'
        window.plugins.toast.show(message, duration, location);
    }
}

function dialog(message, title){
    navigator.notification.alert(
        message,    // message
        null,       // callback
        title, // title
        'OK'        // buttonName
    );
}

function toTitleCase(str){
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}
