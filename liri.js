require("dotenv").config();

const keys = require("./keys.js");

const axios = require("axios");
const fs = require("fs");

let spotify = new Spotify(keys.spotify);
var Spotify = require("node-spotify-api");
var Spotify = process.env.SPOTIFY_ID;

const moment = require("moment");

let command = process.argv[2];
let search = process.argv[3];

fs.appendFile("log.txt", command + ",", function(err){
    if(err) throw err
        });

switch(command){

    case "concert-this":
        concertThis(search);
        break;
            
    case "spotify-this-song":
        spotifyThis(search);
        break;
            
    case "movie-this":
        movieThis(search);
        break;
                    
    case "do-what-it-says":
        doThis(search);
        break;
            
    default:
        console.log("Please enter a command: concert-this, spotify-this-song, movie-this, do-what-it-says}");
    }

function concertThis(artistName) {

        let URL = `https://rest.bandsintown.com/artist/${artistName}/events?app_id=codingbootcamp`;

        axios.get(URL).then((response) => {

            let jsonData = response.data;

            let venueName  = jsonData[0].venue.name;
            let venueLocation = jsonData[0].venue.city + ", " + jsonData[0].venue.region;
            let dateTime = moment(jsonData[0].datetime).format("LLL");

            if (jsonData[0].venue != undefined) {
                console.log(`
                *********************************
                Venue Name: ${venueName}
                Venuen Location: ${venueLocation}
                Date and Time: ${dateTime}
                *********************************
                `
                )
            } else {
                console.log ("No results found.");
            }
    }).catch(err =>{
        console.log(err);
    });
}

function spotifyThis(song) {

    spotify.search({ type: 'track', query: song })
        .then((response) => {

            let jsonData = response.tracks.items;

            let artist = jsonData[0].artist[0].name;
            let track = jsonData[0].name;
            let previewURL = jsonData[0].preview_url;
            let album = jsonData[0].album.name;

            if (response.tracks.total === 0 ) {
                defaultSpotifySong()

            } else {
                console.log(`
                ****************************
                Artist: ${artist}
                Track: ${track}
                Preview URL: ${previewURL}
                Album: ${album}
                *****************************
                `)
            }
        }).catch(err =>{
            console.log(err);
            console.log("No results found! Showing results for 'The Sign' by Ace of Base!");
        });
}

function defaultSpotifySong() {
    spotify.search({ type: 'track', query: 'The Sign'})
    .then((response) => {

        let jsonData = response.tracks.items;

        let artist = jsonData[0].artist[0].name;
        let track = jsonData[0].name;
        let previewURL = jsonData[0].preview_url;
        let album = jsonData[0].album.name;

        for (var i = 0; i < jsonData.length; i++) {
            if (jsonData[i].artist[0].name === "Ace of Base") {
                console.log(`
                ******************************
                Artist: ${artist}
                Track: ${track}
                Preview URL: ${previewURL}
                Album: ${album}
                ******************************
                `)
            }
        }
    }) .catch(err =>{
        console.log(err);
        console.log("No results found!");
    });
}

function movieThis (movieTitle) {
        let URL = `http://www.omdbapi.com/?t="${movieTitle}"&y=&plot=short&apikey=trilogy`;
        
        axios.get(URL).then((response) => {
            let jsonData = response.data;

            let title = jsonData.Title;
            let year = jsonData.Year;
            let imdbRating = jsonData.imdbRating;
            let rottenTomatoRating = jsonData.tomatoUserRating;
            let country = jsonData.Country;
            let language = jsonData.Language;
            let plot = jsonData.Plot;
            let cast = jsonData.Actors;

            if (jsonData.Title != undefined) {
                console.log(`
                Title: ${title}
                Release Year: ${year}
                IMDb Rating: ${imdbRating}
                Rotten Tomatoes Rating: ${rottenTomatoRating}
                Country: ${country}
                Language: ${language}
                Plot: ${plot}
                Cast: ${cast}
                `)
            } else {
                console.log("If you haven't watch 'Mr. Nobody', then you should.  Unfortunately, it's not on Netflix!!")
                movieThis("Mr.Nobody")
            }

        }).catch(err =>{
            console.log(err);
            console.log("No Results Found")
        });
    }

    function doThis() {
        fs.readFile("random.txt", "utf8", function(err, data){
    
            var dataArray = data.split(" , ");
            console.log(dataArray);

            if (err) {
                console.log(err);
            }
        });
    }