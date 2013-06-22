/* Author: Hugh Rawlinson

*/
var cb = new Codebird;
cb.setConsumerKey('ntRLHzCjKiDsSaEXCJ30A', '2R1Im1hENmkKgf6YKRRt9VE0ejvJrDeaUxhBId7VY');
cb.__call(
    'oauth_requestToken',
    {oauth_callback: 'oob'},
    function (reply) {
        // stores it
        cb.setToken(reply.oauth_token, reply.oauth_token_secret);

        // gets the authorize screen URL
        cb.__call(
            'oauth_authorize',
            {},
            function (auth_url) {
                window.codebird_auth = window.open(auth_url);
            }
        );
    }
);

$(document).keypress(function(event) {
  if(event.keyCode == 115){
    document.getElementById('tada').play();
  }
});
