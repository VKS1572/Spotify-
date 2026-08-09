console.log("Hello World");

let currentSong = new Audio();
let songs = [];

// Get all songs
async function getSongs() {
    let a = await fetch("http://127.0.0.1:3000/songs/");
    let response = await a.text();

    let div = document.createElement("div");
    div.innerHTML = response;

    let as = div.getElementsByTagName("a");
    let songs = [];

    for (let i = 0; i < as.length; i++) {
        let href = as[i].getAttribute("href");

        if (href && href.endsWith(".mp3")) {

            // Remove folders and decode filename
            let song = decodeURIComponent(href);

            // Remove Windows or Linux path
            song = song.split("\\").pop();
            song = song.split("/").pop();

            songs.push(song);
        }
    }

    return songs;
}

// Play music
function playMusic(track,pause=false) {

    track = track.split("\\").pop();
    track = track.split("/").pop();

    currentSong.src =
        "http://127.0.0.1:3000/songs/" + encodeURIComponent(track);

    console.log("Playing URL:", currentSong.src);

    // Update UI
    document.querySelector(".songinfo").innerHTML = decodeURIComponent(track);
    document.querySelector(".songtime").innerHTML = "00:00 / 00:00";

    currentSong.play()
        .then(() => {
            document.getElementById("play").src = "pause.svg";
        })
        .catch(err => {
            console.error(err);
        });
}

function formatTime(seconds) {
    if (isNaN(seconds)) return "00:00";

    let minutes = Math.floor(seconds / 60);
    let secs = Math.floor(seconds % 60);

    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

async function main() {
    
    songs = await getSongs();

    playMusic(songs[0],true);

    console.log(songs);

    let songUL = document.querySelector(".songList ul");
    songUL.innerHTML = "";

    for (const song of songs) {

        songUL.innerHTML += `
        <li>
            <img class="invert" width="34" src="music.svg">

            <div class="info">
                <div>${song}</div>
                <div>Vikas</div>
            </div>

            <div class="playnow">
                <span>Play Now</span>
                <img class="invert" src="play.svg">
            </div>
        </li>`;
    }

    Array.from(document.querySelectorAll(".songList li")).forEach((e) => {

        e.addEventListener("click", () => {

            let track = e.querySelector(".info div").innerText.trim();

            playMusic(track);

        });

    });

    // Play / Pause
    document.getElementById("play").addEventListener("click", () => {

        if (currentSong.paused) {
            currentSong.play();
            play.src = "pause.svg";
        } else {
            currentSong.pause();
            play.src = "play.svg";
        }

    });

    // Update time
    currentSong.addEventListener("timeupdate", () => {

    document.querySelector(".songtime").innerHTML =
        `${formatTime(currentSong.currentTime)} / ${formatTime(currentSong.duration)}`;
    document.querySelector(".circle").style.left= (currentSong.currentTime/currentSong.duration)* 100 + "%";
});


//Add an event Listener to seekbar

document.querySelector(".seekbar").addEventListener("click", e=>{
    let percent =( e.offsetX/e.target.getBoundingClientRect().width)*100; 
    document.querySelector(".circle").style.left= percent*100 + "%";
    currentSong.currentTime = ((currentSong.duration) * percent)/100
})

    currentSong.addEventListener("error", (e) => {
        console.log("Audio Error:", e);
    });

    //Add an event listener for hamburger
    document.querySelector(".hamburger").addEventListener("click",()=>{
        document.querySelector(".left").style.left = "0"
    })

    //Add an event listener for close button
     document.querySelector(".close").addEventListener("click",()=>{
        document.querySelector(".left").style.left = "-120%"
    })
    //Add an event listener for next button

    previous.addEventListener("click",()=>{
        comsole.log("Previous button clicked");
    })

    previous.addEventListener("click",()=>{
        comsole.log("Next button clicked");
    })
}

main();