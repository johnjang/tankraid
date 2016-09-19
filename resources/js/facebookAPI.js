//This file is responsible for setting up all the responsible SKDs for facebook
// api. It is also responsible for all the calls made to facebook api.
//Last update: 9/19
//Author: PBJ
//******************************************************************************

//this file will handle everything related to facebook, including API calls
// and related HTML functions

window.fbAsyncInit = function() {
    FB.init({
      appId      : '682658948553810',
      xfbml      : true,
      version    : 'v2.7'
    });
};

(function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

function logintoFB() {
    FB.login(function(response) {
        if(response.authResponse) {
            FB.api('/me', function(response) {
            });
        } else {
        }
    }, {scope: 'publish_pages, publish_actions'} );
}

function publish() {
    FB.getLoginStatus(function(response) {
        if(response.status === 'connected') {
            var uid = response.authResponse.userID;
            var accessToken = response.authResponse.accessToken;
        } else if (response.status === 'not_authorized') {
            
        } else {
            logintoFB();
        }
    });

}
