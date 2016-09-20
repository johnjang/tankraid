//The file is responsible for all facebook api calls and methods
//Last update: 9/19
//Author: PBJ
//******************************************************************************
//this file will handle everything related to facebook, including API calls
// and related HTML functions


window.fbAsyncInit = function() {
    FB.init({
        appId      : '682658948553810',
        cookie     : true,  // enable cookies to allow the server to access 
                            // the session
        xfbml      : true,  // parse social plugins on this page
        version    : 'v2.7' // use graph api version 2.5
    });
};

// Load the SDK asynchronously
(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));


var userInfo;
function startLogin() {
    FB.login(function(response) {
        if(response.status === 'connected') {
            console.log("logged in");
            username = response.name;
            post();

        } else if(response.status === 'not_authorized') {
            console.log("not authorized");
        } else  {
            console.log("not logged in");
        }
    }, {scope: 'publish_actions'} );
}

function post() {
    FB.api('/me/feed', 'post', {message: fbmessage}, 
            function(response) {
                if (response && !response.error) {
                    alert("posted to facebook! check your wall!");
                } else {
                    alert("failed to post on the wall :S try again ");
                }
    });
    start();
    
}

