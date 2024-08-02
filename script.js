console.log("Let's write JavaScript");

async function getSongs(){
    let a = await fetch("http://127.0.0.1:3000/songs/") //Ch
    let response = await a.text();
    console.log(response);
    let div = document.createElement("div")
    div.innerHTML = response;
    let as = div.getElementsByTagName("a");
    let songs = [];
    for (let i = 0; i < as.length; i++) {
        const element = as[i];
        if(element.href.endsWith(".mp3")){
            songs.push(element.href.split("/songs/")[1]) //Ch
        }
    }
    return songs;

}

async function main(){
    //Get the lists of all songs 
    let songs = await getSongs();
    console.log(songs);

    let songUL = document.querySelector(".songLists").getElementsByTagName("ul")[0]
    for (const song of songs) {
        songUL.innerHTML = songUL.innerHTML + `<li>${song}</li>`;
    }

    //Play the first song
    var audio = new Audio(songs[0]);
    audio.play();

    audio.addEventListener("loadeddata",()=>{
        console.log(audio.duration,audio.currentSrc,audio.currentTime);

    });

}

main();