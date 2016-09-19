alert("facebook starting");
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


function publish() {
    alert("publishing");
    var body = 'test123';
    FB.api('/me/feed', 'post', { message: body }, function(response) {
      if (!response || response.error) {
        alert('Error occured');
      } else {
        alert('Post ID: ' + response.id);
      }
    });
}
