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
function playMusic(track) {

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

async function main() {

    songs = await getSongs();

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
            `${Math.floor(currentSong.currentTime)} / ${Math.floor(currentSong.duration)}`;

    });

    currentSong.addEventListener("error", (e) => {
        console.log("Audio Error:", e);
    });

}

main();