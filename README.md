# lireNodeApp

### About this App:

LIRI (Lanaguage Interpretations and Recognition Interface) is a command line node app that takes in user inputs given specific command and returns specific data back to the user.  The user has the options of using these four commands along with his/her own inputs:

 ![Image of four commands](./images/fourCommandsfortheCommandLine.png)

 ### Packages and Technologes Used for this App:

 * Node.js,
 * Moment.js,
 * Axios,
 * fs,
 * dotenv,
 * Spotify API,
 * BandsInTown API, and
 * OMDB API.

### Local Environment Setup of this App:

To use liriNodeApp from your local environment:

1. Get an API key for Spotify here: <https://developer.spotify.com/my-applications/#!/>.
2. Clone my repo using the command line.
3. Change the directory to the cloned repo.
4. Create a dotenv file and put your Spotify's client ID and client secret password into it.
4. Install all required NPM packages by typing npm install.
5. Start the application server on the command line by typing node lire.js following one of the commands below.

### concert-this 

Type in the command line: node liri.js concert-this Kacey Musgraves.

![Image of concert-this](./images/concertThis.png)

Then the result of your search appears in the log.txt:

![Image of concert-this log](./images/concertThisLog.png)

### spotify-this-song

Type in the command line: node liri.js spotify-this-song Human Behavior.

![Image of spotify-this-song](./images/spotifyThisSong.png)

Then the result of your search appears in the log.txt:

![Image of spotify-this-song log](./images/spotifyThisSongLog.png)

### movie-this

Type in the command line: node liri.js movie-this Annie.

![Image of movie-this](./images/movieThis.png)

Then the result of your search appears in the log.txt:

![Image of movie-this log](./images/movieThisLog.png)


### Thanks for visiting my GitHub!

If you like this app, you may enjoy using more of my apps here: https://lucyq19.github.io/professionalPortfolio/
