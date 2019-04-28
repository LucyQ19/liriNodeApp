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

function storeAndDisplayData(formatted) {
    const divider = "\n----------------------------------------------------------\n\n";

    return new Promise((resolve, reject)=>{
        fs.appendFile("log.txt", formatted + divider, function(err){
            if(err) return reject(err);

            console.log(formatted);
            resolve();
        })
    })
}

function concertThis(artistName) {

        const URL = `https://rest.bandsintown.com/artist/${artistName}/events?app_id=codingbootcamp`;

        axios.get(URL).then((response) => {
            const jsonData = response.data;

            const showConcertData = [
                "Venue Name: " + jsonData[0].venue.name,
                "Venue Location: " + jsonData[0].venue.city + " , " + jsonData[0].venue.region,
                "Date and Time: " + moment(jsonData.datetime).format("LLL")
            ].join("\n\n");

            return showConcertData;
        }).then(data => {
            return storeAndDisplayData(data);
        }).catch(err => {
            console.log(err);
        });
    }

function spotifyThis(song) {

    spotify.search({ type: 'track', query: song })
        .then((response) => {
            const jsonData = response.tracks.items;

            const showSongData = [
                "Artist: " + jsonData[0].artist[0].name,
                "Tracks: " + jsonData[0].name,
                "Preview URL: " + jsonData[0].preview_url,
                "Album: " + jsonData[0].album.name  
            ].join("\n\n");

            return showSongData;

        }).then(data => {
            return storeAndDisplayData();

        }).catch(function(err) {
        console.log(err);
  });

}

function movieThis (movieTitle) {
        const URL = `http://www.omdbapi.com/?t="${movieTitle}"&y=&plot=short&apikey=trilogy`;
        
        axios.get(URL).then((response) => {
            const jsonData = response.data;

            const showMovieData = [
                "Title: " + jsonData.Title,
                "Release Year: " + jsonData.Year,
                "IMDb Rating: " + jsonData.imdbRating,
                "Rotten Tomatoes Rating: " + jsonData.tomatoUserRating,
                "Country: " + jsonData.Country,
                "Language: " + jsonData.Language,
                "Plot: " + jsonData.Plot,
                "Cast: " + jsonData.Actors,
            ].join("\n\n");

            return showMovieData;
        }).then(data => {
            return storeAndDisplayData(data);
        }).catch(err =>{
            console.log(err);
        });
    }

    function doThis() {
        fs.readFile("random.txt", "utf8", function(error, data){
    
            var dataArray = data.split(" , ");
            console.log(dataArray);
    
            var randomCommand = dataArray[0];
    
            parameter = dataArragy[1];
    
            switch(randomCommand) {
                case "concert-this":
                concertThis();
        
            case "spotify-this-song":
                spotifySong()
        
            case "movie-this":
               omdbMovie();
                break;
                
            case "do-what-it-says":
                doThis();
                break;
    
            }
        });
    }