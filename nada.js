let favorites = [];
let songs = [];

let playPause = ()=>{
    if(document.querySelector('audio').paused){
        document.querySelector('audio').play();
        return;
    }
    document.querySelector('audio').pause();
}
let next = ()=>{
    let src = document.querySelector('audio');
    let currentIndex = -1;
    songs.forEach((s,sindex)=>{
        if(src == s.filename){
            currentIndex = sindex;
        }
    })
    let nextIndex = currentIndex++;
    if(currentIndex == songs.length-1){
        nextIndex = 0;
    }
    document.querySelector('audio').src = songs[nextIndex].filename;
}
let previous = ()=>{

}
let seek = ()=>{

}
let repeat = ()=>{

}
let random = ()=>{

}
let favorite = ()=>{
    
}
let volume = ()=>{

}

let buildPlayer = (song)=>{

}
let buildPlaylist = ()=>{

}

let initAll = ()=>{
    if(localStorage.getItem('favorites')){
        favorites = JSON.parse(localStorage.getItem('favorites'));
    }
}