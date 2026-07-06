console.log("Hello World");

let currentSong = new Audio;

async function getSongs() {
   let a = await fetch("http://127.0.0.1:3000/songs/");
   let response = await a.text();
   let div = document.createElement("div");
   div.innerHTML = response;
   let as = div.getElementsByTagName("a");
   let songs = [];
   
   for(let index = 0; index < as.length; index++){
      const element = as[index];

      if(element.href.endsWith(".mp3")){
      songs.push(decodeURIComponent(element.href.split("/").pop()));
      }
   }
   return songs
}


const playMusic = (track)=>{
   //let audio = new Audio("/songs/" + track);
   currentSong.src = "/songs/"+ track
   currentSong.play()
}

async function main() {
    //get list all the songs in the console
let songs = await getSongs();


//show all the songs in the playlist
let songUL = document.querySelector(".songList").getElementsByTagName("ul")[0]
for (const song of songs) {
   songUL.innerHTML = songUL.innerHTML +  `<li>
    
                <img class="invert" width="34" src="music.svg" alt="">
                <div class="info">
                  <div > ${song.replaceAll("%20", " ")}</div>
                  <div>Vikas</div>
                </div>
                <div class="playnow"> 
                   <span>Play Now</span>
                   <img class= "invert" src="play.svg" alt="">
                </div> </li>`;
   
}
Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e=>{
console.log(e.querySelector(".info").firstElementChild.innerHTML)
playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim())

})

}

main()