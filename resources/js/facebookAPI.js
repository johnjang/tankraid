//The file is responsible for all facebook api calls and methods
//Last update: 9/19
//Author: PBJ
//******************************************************************************
//this file will handle everything related to facebook, including API calls
// and related HTML functions

//facebook web API information 
window.fbAsyncInit = function() {
    FB.init({
        appId      : '682658948553810',
        cookie     : true,
        xfbml      : true,
        version    : 'v2.7'
    });
};

//load the SDK 
(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

var loggedIn = false;
//login to facebook
//true if successful, false otherwise
function facebookLogin() {
    FB.login(function(response) {
        if(response.status === 'connected') {
            console.log(response.name + " has connected" );
            postOnWall();
        } else if(response.status === 'not_authorized') {
            return false;
        } else {
            return false;
        }
    });
}

//this function will post mesage to user's timeline.
//return true if successful, false otherwise
function postOnWall() {
    //check user status
    FB.getLoginStatus(function(response) {
        if(response.status === 'connected') {
            console.log("connected to facebook");
            console.log(response.name);
            FB.api('/{682658948553810}/feed', 
                "POST", 
                {
                    "message": response.name + fbmessage
                },
                function(response) {
                    if (!response.error) {
                        return true;
                }
            });
        } else {
            return false;    
        }
    });
}



