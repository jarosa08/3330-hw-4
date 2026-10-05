// *********************************************************************
// Homework 4 APIs
// *********************************************************************

function convertMsToMinSec(ms) {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  const paddedSeconds = String(seconds).padStart(2, '0');
  return `${minutes}:${paddedSeconds}`;
}

// **************** Update code below  **************** 


// IDs and secret token should come from Spotify
localStorage.setItem("artist_id", "2BQVRw9md4UKcGUrDXABCD");
localStorage.setItem("access_token", "BQB-XjGBypVuwbVYl7WPIAWxqRXQDLiHlPnd92ofLkD1RokktbXCMoxI0rbriRi9wZjASgkPV4Smk347TklvuK19aOo1bkx0I6-zXn0JiNy5yfhXCENFce72j8T_oNTxeXpBEXjUSvpS");
localStorage.setItem("track_id_1", "2TIEeLrOQrGnO2D2OeDDJu");
localStorage.setItem("track_id_2", "1Mew3ipJFmRpSj83LRyxod");
localStorage.setItem("track_id_3", "7cxOL3nvmqd6w811wOlWT1");
localStorage.setItem("album_id_1", "7s7VUEHeahtofdXGDz08Gf");
localStorage.setItem("album_id_2", "5zSPDpefI09DHOSdQLJTW6");
localStorage.setItem("album_id_3", "58OXNbpZDhQjWTv51DKpux");
localStorage.setItem("album_id_4", "2W5u3Jq1YRu58MeYSIiqZV");


function load(){
    
    let artistID = localStorage.getItem("artist_id");
    let accessToken = localStorage.getItem("access_token");
    let trackID1 = localStorage.getItem("track_id_1");
    let trackID2 = localStorage.getItem("track_id_2");
    let trackID3 = localStorage.getItem("track_id_3");
    let albumID1 = localStorage.getItem("album_id_1");
    let albumID2 = localStorage.getItem("album_id_2");
    let albumID3 = localStorage.getItem("album_id_3");
    let albumID4 = localStorage.getItem("album_id_4");

    /***************** start: artist section ******************/

    // async for artist info
    (async () => {
      try{
        const response = await fetch( 
          `https://api.spotify.com/v1/artists/${artistID}`, 
          { 
              headers: { 
                  Authorization: `Bearer ${accessToken}` 
              } 
          } 
        ); 
     
        if(!response.ok){
          throw new Error(`HTTP error:${response.status}`);
        }

        const artist = await response.json();

        // update page title
        document.querySelector("title").textContent = artist.name + ` | Spotify`;

        // update name
        document.querySelector("#artist-name").textContent = artist.name;

        // update pic
        document.querySelector(".artist-image").firstElementChild.src = artist.images[0].url;

      } catch (error) {
        console.log(`Fetch error:`, error);
      }
    }) ();

    /***************** end: artist section ******************/


    /***************** start: popular section ******************/

    // async for tracks
    (async () => {
      try {
        const [track1Res, track2Res, track3Res] = await Promise.all([
          fetch(`https://api.spotify.com/v1/tracks/${trackID1}`, 
          { 
              headers: { 
                  Authorization: `Bearer ${accessToken}` 
              } 
          } ),
          fetch(`https://api.spotify.com/v1/tracks/${trackID2}`, 
          { 
              headers: { 
                  Authorization: `Bearer ${accessToken}` 
              } 
          } ),
          fetch(`https://api.spotify.com/v1/tracks/${trackID3}`, 
          { 
              headers: { 
                  Authorization: `Bearer ${accessToken}` 
              } 
          } )
        ]);

        if (!track1Res.ok || !track2Res.ok || !track3Res.ok){
          throw new Error(`HTTP error(s): ${album1Res.status}, \n${album2Res.status}, \n${album3Res.status}`);
        }

        const [track1, track2, track3] = await Promise.all([
          track1Res.json(),
          track2Res.json(),
          track3Res.json()
        ]);

        // put responses in array
        let tracks = [track1, track2, track3];

        // update current playing song/bottom player
        let currentPlaying = document.querySelector(".now-playing");
        // update current playing img
        currentPlaying.children[0].src = track1.album.images[0].url;
        // update current playing song name
        currentPlaying.children[1].children[0].textContent = track1.name;
        // update current playing artist name
        currentPlaying.children[1].children[1].textContent = track1.artists[0].name;
        // update progress bar duration
        document.querySelector(".progress-container").children[2].textContent = convertMsToMinSec(track1.duration_ms);;

        // get track class elements
        let allTracks = document.querySelectorAll(".track");
        // counter for tracks
        let trackNum = 0;
        // go through each track
        allTracks.forEach(track => {
          // update picture
          track.children[1].src = tracks[`${trackNum}`].album.images[0].url;
          // update title
          track.children[2].children[0].textContent = tracks[`${trackNum}`].name;
          // update album
          track.children[2].children[1].textContent = tracks[`${trackNum}`].album.name;
          // update duration
          track.children[4].textContent = convertMsToMinSec(tracks[`${trackNum}`].duration_ms);
          //update number
          track.children[3].textContent = tracks[`${trackNum}`].track_number;
          // increment tracknum
          trackNum++;
        });

      } catch (error) {
        console.error(`Fetch error(s):`, error);
      }
      
    }) ();


    /***************** end: popular section ******************/



    /***************** start: discography section ******************/

    // async for albums
    (async () => {
      try {
        const [album1Res, album2Res, album3Res, album4Res] = await Promise.all([
          fetch(`https://api.spotify.com/v1/albums/${albumID1}`, 
          { 
              headers: { 
                  Authorization: `Bearer ${accessToken}` 
              } 
          } ),
          fetch(`https://api.spotify.com/v1/albums/${albumID2}`, 
          { 
              headers: { 
                  Authorization: `Bearer ${accessToken}` 
              } 
          } ),
          fetch(`https://api.spotify.com/v1/albums/${albumID3}`, 
          { 
              headers: { 
                  Authorization: `Bearer ${accessToken}` 
              } 
          } ),
          fetch(`https://api.spotify.com/v1/albums/${albumID4}`, 
          { 
              headers: { 
                  Authorization: `Bearer ${accessToken}` 
              } 
          } )
        ]);

        if (!album1Res.ok || !album2Res.ok || !album3Res.ok || !album4Res.status){
          throw new Error(`HTTP error(s): ${album1Res.status}, \n${album2Res.status}, \n${album3Res.status}, \n${album4Res.status}`);
        }

        const [album1, album2, album3, album4] = await Promise.all([
          album1Res.json(),
          album2Res.json(),
          album3Res.json(),
          album4Res.json()
        ]);

        // put responses in array
        let albums = [album1, album2, album3, album4];

        // get album-card class elements
        let albumsCards = document.querySelectorAll(".album-card");
        // counter for cards
        let cardNum = 0;
        // go through each album
        albumsCards.forEach(card => {
          // update picture
          card.children[0].src = albums[`${cardNum}`].images[0].url;
          // update title
          card.children[1].textContent = albums[`${cardNum}`].name;
          // update album info
          card.children[2].textContent = albums[`${cardNum}`].release_date + ` • ` + albums[`${cardNum}`].album_type;
          // increment cardnum
          cardNum++;
        });

      } catch (error) {
        console.error(`Fetch error(s):`, error);
      }
      
    }) ();

    /***************** end: discography section ******************/

}
load();