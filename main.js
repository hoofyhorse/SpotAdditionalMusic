const Discord = require('discord.js');
var request = require('request'); // "Request" library
const client = new Discord.Client();


var client_id = // Your client id
var client_secret = // Your secret
const prefix = '-';

client.on('message', message =>{
	if(!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).split(/ +/);
	const command = args.shift().toLowerCase();

	
	if(command === 'ping'){
		message.channel.send('pong!');
	}
	
	
	if (command.match(/find\d*like/)){
		var mynumber = parseInt(command.replace(/[a-zA-Z]/g,''));
		console.log(mynumber);
  
  
		var arg = message.content.slice(message.content.indexOf(" "));
		if(arg === null || arg.match(/^ *$/) !== null || arg.length < 2){
			console.log("nothin here");
		} else {
			var searchurl = '';
			var searchCriteria = arg.replace(/\ /g,'+');
			searchurl = searchurl.concat('https://api.spotify.com/v1/search?q=',searchCriteria,'&type=track&limit=1');
			
			
			
			
			
			
			// your application requests authorization
			var authOptions = {
			  url: 'https://accounts.spotify.com/api/token',
			  headers: {
				'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
			  },
			  form: {
				grant_type: 'client_credentials'
			  },
			  json: true
			};

			request.post(authOptions, function(error, response, body) {
			  if (!error && response.statusCode === 200) {

				// use the access token to access the Spotify Web API
				var token = body.access_token;
				var options = {
				  url: searchurl,
				  headers: {
					'Authorization': 'Bearer ' + token
				  },
				  json: true
				};
				request.get(options, function(error, response, body) {
				  console.log(body.tracks.items[0].name);
				  console.log(body.tracks.items[0].artists[0].name);
				  
				  
				  var similarURL = '';
				  similarURL = similarURL.concat('https://api.spotify.com/v1/recommendations?limit=',mynumber,'&seed_artists=',body.tracks.items[0].artists[0].id,'&seed_tracks=',body.tracks.items[0].id);
				  console.log(similarURL);
				  var options = {
					url: similarURL,
					headers: {
						'Authorization': 'Bearer ' + token
					},
					json: true
				  };
				  request.get(options, function(error, response, body) {
					for (let step = 0; step < mynumber; step++) {
						// Runs 5 times, with values of step 0 through 4.
						message.channel.send('!play '.concat(body.tracks[step].uri));
						console.log('!play '.concat(body.tracks[step].uri));
					}
					
					
					
				  });
				});
			  }
			});
			
			
			
			
			
			
			
			
			
			
			
	}
}
	
	
	
	
})










client.login(''); //discord login key

client.once('ready', () => {
	console.log('MyBot is online');
});
	






