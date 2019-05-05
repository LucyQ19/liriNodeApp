require("dotenv").config();

const fs = require("fs");
const axios = require("axios");
const moment = require("moment");
const Spotify = require("node-spotify-api");

const keys = require("./keys.js");
let spotify = new Spotify(keys.spotify);

let command = process.argv[2];
let search = process.argv[3];

function storeAndDisplayData(formatted){
    const divider = "\n----------------------------------------------------------------------\n\n";

    return new Promise((resolve, reject)=> {
        fs.appendFile("log.txt", formatted + divider, function(err){
            if(err) return reject(err)

            console.log(formatted);
            resolve();
                });
    })
}


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
        console.log("Please enter a command: concert-this, spotify-this-song, movie-this, do-what-it-says");
    }

function concertThis(artistName) {

        const URL = `https://rest.bandsintown.com/artists/${artistName}/events?app_id=codingbootcamp`;

        axios.get(URL).then((response) => {

            const jsonData = response.data;

            const showData = [
                "*****************************************************************************",
                "Venue Name: " + jsonData[0].venue.name,
                "Venue Location: " + jsonData[0].venue.city + ", " + jsonData[0].venue.country,
                "Date and Time: " + moment(jsonData[0].datetime).format("LLL"),
                "*****************************************************************************"
            ].join("\n\n");
            
            return showData;

    }).then(data=>{
        return storeAndDisplayData(data);
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
        const URL = `http://www.omdbapi.com/?t="${movieTitle}"&y=&plot=short&apikey=trilogy`;
        
        axios.get(URL).then((response) => {
            const jsonData = response.data;

            const showData = [
                "*****************************************************************************",
                "Title: " + jsonData.Title,
                "Year: " + jsonData.Year,
                "IMDb Rating: " + jsonData.imdbRating,
                "Country: " + jsonData.Country,
                "Language: " + jsonData.Language,
                "Plot: " + jsonData.Plot,
                "Cast: " + jsonData.Actors,
                "*****************************************************************************"
            ].join("\n\n");

            return showData;

        }).then(data=>{
            return storeAndDisplayData(data);
        }).catch(err =>{
            console.log(err);
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