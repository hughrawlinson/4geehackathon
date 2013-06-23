/* Author: Hugh Rawlinson

*/
var cb = new Codebird;
cb.setConsumerKey('ntRLHzCjKiDsSaEXCJ30A', '2R1Im1hENmkKgf6YKRRt9VE0ejvJrDeaUxhBId7VY');

function authTwit(){
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
}

$(document).keypress(function(event) {
  if(event.keyCode == 115){
    document.getElementById('tada').play();
  }
  if(event.keyCode == 99){
  	$("#catContainer").fadeToggle(600);
  }
});

$(document).ready(function(){
	if(IN.User.isAuthorized()){
		$(this).addClass("linkedInAuthorised");
	}
});
var listitem = "";
$('#submit').click(function(){
	var searchParameter = $('#input').val();
	IN.API.PeopleSearch()
		.fields(['first-name','last-name','picture-url','site-standard-profile-request'])
		.params({"skill":searchParameter})
		.result(function(data){
			console.log(data);
			var list = "<ul>";
			for(var i = 0; i < data.people.values.length; i++){
				if(data.people.values[i].siteStandardProfileRequest!=undefined){
					listitem = "<a href='"+data.people.values[i].siteStandardProfileRequest.url+"'><li>";
					listitem = listitem.concat("<img src='"+data.people.values[i].pictureUrl+"'/>");
					listitem = listitem.concat("<label>"+data.people.values[i].firstName+" "+data.people.values[i].lastName+"<label/>");
					listitem = listitem.concat("</li></a>");
				}
				else{
					listitem = listitem = "<li>";
					listitem = listitem.concat("<img src='"+data.people.values[i].pictureUrl+"'/>");
					listitem = listitem.concat("<label>"+data.people.values[i].firstName+" "+data.people.values[i].lastName+"<label/>");
					listitem = listitem.concat("</li>");
				}
				console.log(listitem);
				list = list.concat(listitem);
			}
			list.concat("</ul>");
			$('#linkedinList').html(list);
		});
})
navigator.geolocation.getCurrentPosition(locate);

function locate(position){
	console.log(position);
}

$("#linkedin").click(function(){
	console.log("boom mathafackaz!!");
	$('#linkedinLoginContainer').html('<script type="IN/Login" data-onauth="loadData"></script>');
	$(this).addClass("linkedInAuthorised");
});

// Pusher.log = function(message) {
//   if (window.console && window.console.log) {
//     window.console.log(message);
//   }
// };