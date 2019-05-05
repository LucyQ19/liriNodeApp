require("dotenv").config();

const keys = require("./keys.js");

const fs = require("fs");
const axios = require("axios");
const moment = require("moment");
const Spotify = require("node-spotify-api");

let spotify = new Spotify(keys.spotify);

let command = process.argv[2];
let searchTerm = process.argv[3];

function storeAndDisplayData(formatted){
    const divider = "\n----------------------------------------------------------------------------------------------------------------------------\n\n";

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
        if(searchTerm) {
            concertThis(searchTerm);
        } else concertThis("Kacey Musgraves");
        
        break;
            
    case "spotify-this-song":
        if(searchTerm) {
            spotifyThis(searchTerm)
        } else spotifyThis("Human Behavior");
        break;
            
    case "movie-this":
        if(searchTerm) {
            movieThis(searchTerm);             
        } else movieThis("Don't Tell Mom the Babysitter's Dead");
        break;
                    
    case "do-what-it-says":
        doThis();
        break;
            
    default:
        console.log("\nPlease enter a command: \n\n node liri.js concert-this, \n node liri.js spotify-this-song, \n node liri.js movie-this, \n node liri.js do-what-it-says\n");
    }

function concertThis(artistName) {

        let URL = `https://rest.bandsintown.com/artists/${artistName}/events?app_id=codingbootcamp`;

        axios.get(URL).then((response) => {

            let jsonData = response.data;

            let showData = [

               "Artist: " + artistName,
                "Venue Name: " + jsonData[0].venue.name,
                "Venue Location: " + jsonData[0].venue.city + ", " + jsonData[0].venue.country,
                "Date and Time: " + moment(jsonData[0].datetime).format("LLL"),
                
            ].join("\n\n");
            
            return showData;

    }).then(data => {
        return storeAndDisplayData(data);
    }).catch(err => {
        console.log(err);
     });
}

function spotifyThis(song) {

    spotify.search({ type: 'track', query: song })
        .then((response) => {

            let jsonData = response.tracks.items;

            let showData = [

                "Artist(s): " + jsonData[0].artists[0].name,
                "Song: " + jsonData[0].name,
                "Album: " + jsonData[0].album.name,
                "Preview Link: " + jsonData[0].preview_url,

            ].join("\n\n");

            return showData;

        }).then(data => {
            return storeAndDisplayData(data);
            
        }).catch(err => {
            console.log(err);

        });
}

function movieThis (movieTitle) {
        let URL = `http://www.omdbapi.com/?t="${movieTitle}"&y=&plot=short&apikey=trilogy`;
        
        axios.get(URL).then((response) => {
            let jsonData = response.data;

            let showData = [
               
                "Title: " + jsonData.Title,
                "Year: " + jsonData.Year,
                "IMDb Rating: " + jsonData.imdbRating,
                "Country: " + jsonData.Country,
                "Language: " + jsonData.Language,
                "Plot: " + jsonData.Plot,
                "Cast: " + jsonData.Actors,
               
            ].join("\n\n");

            return showData;

        }).then(data => {
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