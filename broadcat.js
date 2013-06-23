var http = require('http');
var Pusher = require('pusher');
var count = 0;
var url="https://api.instagram.com/v1/tags/cat/media/recent?client_id=96f9bfe647514976ba6cea29b9cb33f2";
var body = {data:[images:{standard_resolution{url:"http://distilleryimage6.s3.amazonaws.com/4faa118cdb7b11e292d622000ae909ac_7.jpg"}}]}
var pusher = new Pusher({
			  appId: '38442',
			  key: '1ccd6fd9880863b97f0d',
			  secret: 'dd9e528ed20dca277c00'
			});

setInterval(function(){
	http.get(url, function(res) {
	      body = '';

	      res.on('data', function(chunk) {
	         body += chunk;
	      });

	      res.on('end', function() {
	        var CATS = JSON.parse(body)
	      });
	    }).on('error', function(e) {
	      console.log("Got error: " + e.message);
	});
},1800000);

setInterval(function(){
	pusher.trigger('international_cat_supply_channel', 'the_catpocalypse', {
	  "heresACat": body.data[0].standard_resolution.url;
	});
	count = (count+1)%body.data[0].length;
},30000);