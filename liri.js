
var dotenv = require('dotenv').config();
var keys = require("./keys");
var request = require("request");
var http = require("http");
var Twitter = require('twitter');
// npm install twitter done
// var client = new Twitter(keys.twitter);
var Spotify = require('node-spotify-api');
// npm install --save node-spotify-api done
const fs = require('fs');

// npm install dotenv --save do e

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var input = process.argv[2];
switch (input) {
case "my-tweets": myTweets();
break;
case "spotify-this-song": spotifysong();
break;
case "movie-this": moviethis();
break;
// case "do-what-it-says": somefunction4();
}

// Twitter Function to retrieve tweets
function myTweets() {
    var params = {screen_name: 'mrshalup', count: 20};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    for (i=0; i<20; i++) {
    console.log("Tweet: " + tweets[i].text + " Was sent: " + tweets[i].created_at);}
  }
  if (error) throw error;
});
};

// Function to retrieve Spotify Songs

function spotifysong() {
  var nodeinput = process.argv;
  var songName = "";
  for (var i=3; i < nodeinput.length; i++){
		songName = songName + " " + nodeinput[i];
	}
  
  if (!songName) {

  spotify.search({ type: 'track', query: 'The Sign', limit: 10}, function(err, body) {

  if (err) {
    return console.log('Error occurred: ' + err);
  }
  else {
    var songInfo = body.tracks.items[5];
    var songResult = console.log("Artist: " + songInfo.artists[0].name)
                     console.log("Song: " + songInfo.name)
                     console.log("Album: " + songInfo.album.name)
                     console.log("Preview: " + songInfo.preview_url)
 
}});
  }


else  {
  spotify.search({ type: 'track', query: songName }, function(err, body) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    else {
    var songInfo = body.tracks.items[0];
    var songResult = console.log("Artist: " + songInfo.artists[0].name)
                     console.log("Song: " + songInfo.name)
                     console.log("Album: " + songInfo.album.name)
                     console.log("Preview: " + songInfo.preview_url)
    
    }
 
  })
}
  
}


// Function for movie information
function moviethis() {
  var nodeinput2 = process.argv;
  var movieName = "";
  for (var i=3; i < nodeinput2.length; i++){
		movieName = movieName + " " + nodeinput2[i];
  }
  
  if (!movieName) {
console.log("If you haven't watched Mr. Nobody, then you should: http://www.imdb.com/title/tt0485947/");
console.log("It's on Netflix!")
}
else if (movieName) {
var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
request(queryUrl, function(error, response, body) {
  if (!error && response.statusCode === 200) {
    var movie=JSON.parse(body);
    console.log("Title: " + movie.Title);
    console.log("Release Year: " + movie.Year);
    console.log("Rating: " + movie.Rated);
    console.log("Rotten Tomatoes: " + movie.Ratings[1].Value);
    console.log("Country: " + movie.Country);
    console.log("Language: " + movie.Language);
    console.log("Plot: " + movie.Plot);
    console.log("Actors: " + movie.Actors);}
  });
};
}


