"use strict";

let song_img_el = document.getElementById("song-image");
let song_title_el = document.getElementById("song-title");
let song_artist_el = document.getElementById("song-artist");
let song_next_up_el = document.getElementById("song-next-up");

let play_btn = document.getElementById("play-btn");
let play_btn_icon = document.getElementById("play-icon");
let prev_btn = document.getElementById("prev-btn");
let next_btn = document.getElementById("next-btn");

let audio_player = document.getElementById("music-player");

//Regular list//
let regular_list_button = document.querySelector(".regular_list_button");
//Regular list//

//Favorite list//
let favorite_list_button = document.querySelector(".fav_list_button");
//Favorite list//

//Heart Icon//
let heart = document.querySelector(".fa-heart");
// End Heart Icon//

//List of songs//
let songList = document.querySelector(".song_list");
//List of songs//

//Seekbar//
let seekbar_area = document.querySelector(".seekbar_area");
let seekbar = document.querySelector("#seekbar");
//Seekbar//

//Volume//
let volume = document.querySelector("#volume");
//Volume//

//Repeat//
let repeat = document.querySelector(".repeat_button");
//Repeat//

//Random//
let random = document.querySelector(".random_button");
let isRandom = false;
//Random//

let current_song_index;
let next_song_index;

//IMAGE ANIMATION//
let image_anim = document.querySelector(".player");
//IMAGE ANIMATION//

let songs = [];
let favorite_songs = [];
if (localStorage.getItem("favs")) {
  favorite_songs = JSON.parse(localStorage.getItem("favs"));
}

fetch("./tracks.json")
  .then((results) => results.json())
  .then((data) => {
    // console.log(data);
    songs = data;
    InitPlayer();
  });

function InitPlayer() {
  current_song_index = 0;
  next_song_index = current_song_index + 1;
  play_btn.addEventListener("click", togglePlaySong);
  next_btn.addEventListener("click", function () {
    changeSong();
  });
  prev_btn.addEventListener("click", function () {
    changeSong(false);
  });
  // console.log(next_song_index)
  regular_list();
  updatePlayer();
}

//regular list function//
function regular_list() {
  document.querySelector(".song_list").innerHTML = ""; /////////////////////////////////////////////

  songs.forEach((song, index) => {
    document.querySelector(".play-h1").textContent = "Playlist 💥";
    let html = `<li data_index = ${index} src = '${song.filename}'>${song.title}  by  ${song.artist} </li>`;
    console.log(html);
    // <span>${song.filename.duration}</span>
    document.querySelector(".song_list").innerHTML += html;
    
  });
  console.log(document.querySelectorAll(".song_list li"))
  ////////////////////////
  let songIndex;
  document.querySelectorAll(".song_list li").forEach(li=>{
    li.addEventListener(
      "click",
      function (e) {
        songIndex = e.target.getAttribute("data_index");
        let selectedSong = songs[songIndex];
        console.log(selectedSong);
        //
        console.log(next_song_index)
        song_img_el.style = `background-image:url(tracks/thumbnails/${selectedSong.thumbnail})`;
        song_title_el.innerText = selectedSong.title;
        song_artist_el.innerText = selectedSong.artist;
        song_next_up_el.innerText =
          songs[next_song_index].title +
          " " +
          "by " +
          " " +
          songs[next_song_index].artist;
        audio_player.src = `/tracks/${selectedSong.filename}`;
        //
        togglePlaySong();
  
        // console.log(songs[songIndex]);
      },
      false
    );
  })
}

//end regular list function//

// fav function//

function favorite_list() {
  document.querySelector(".play-h1").innerHTML = "Favorite List 💖";
  let html = "";
  favorite_songs.forEach((song,index) => {
    document.querySelector(".song_list").innerHTML = "";
    html += `<li  data_index = ${index} src = '${song.filename}'>${song.title}  by  ${song.artist} </li>`;
    // console.log(html);
    document.querySelector(".song_list").innerHTML += html;
  });
  ////////////////////
  let songIndex;
  document.querySelectorAll(".song_list li").forEach(li=>{
    li.addEventListener(
      "click",
      function (e) {
        let songs = favorite_songs;
        songIndex = e.target.getAttribute("data_index");
        let selectedSong = songs[songIndex];
        console.log(selectedSong);
        //
        console.log(next_song_index)
        song_img_el.style = `background-image:url(tracks/thumbnails/${selectedSong.thumbnail})`;
        song_title_el.innerText = selectedSong.title;
        song_artist_el.innerText = selectedSong.artist;
        song_next_up_el.innerText =
          songs[next_song_index].title +
          " " +
          "by " +
          " " +
          songs[next_song_index].artist;
        audio_player.src = `/tracks/${selectedSong.filename}`;
        //
        togglePlaySong();
  
        // console.log(songs[songIndex]);
      },
      false
    );
  })
}
// fav function//

//VOLUME FUNCTION//
function volumeControl() {
  volume.addEventListener("change", function (e) {
    audio_player.volume = e.currentTarget.value / 100;
  });
}
//END VOLUME FUNCTION//

//REPEAT FUNCTION//
function repeatSong() {
  repeat.addEventListener("click", function (e) {
    if (audio_player.loop === true) {
      audio_player.loop = false;

      document.querySelector(".on-off").textContent = "Off!";
    } else {
      audio_player.loop = true;
      document.querySelector(".on-off").textContent = "On!";

      repeat.addEventListener("ended", function (e) {
        audio_player.currentTime = 0;
      });
    }
    console.log(audio_player.loop);
  });
}

function random_Song() {
  let randomSong = songs[Math.floor(Math.random() * songs.length)];
  let randomIndex = songs.indexOf(randomSong);

  let next_random_index = randomIndex + 1;
  if (randomIndex === 12) {
    next_random_index = 0;
  } else {
    next_random_index + 1;
  }

  console.log(next_random_index);

  song_img_el.style = `background-image:url(tracks/thumbnails/${randomSong.thumbnail})`;
  song_title_el.innerText = randomSong.title;
  song_artist_el.innerText = randomSong.artist;
  song_next_up_el.innerText =
    songs[next_random_index].title +
    " " +
    "by " +
    " " +
    songs[next_random_index].artist;
  // songs[randomIndex === 10 ? 0 : randomIndex].title +
  // " " +
  // "by " +
  // " " +
  // songs[randomIndex === 10 ? 0 : randomIndex].artist;

  audio_player.src = `/tracks/${randomSong.filename}`;
  console.log("clicked");

  togglePlaySong();
}
//END REPEAT FUNCTION//
//ADD FAVORITES//
heart.addEventListener("click", (e) => {
  let song = songs[current_song_index];
  console.log(e.target)
  console.trace();
  heart.classList.toggle("far");
  heart.classList.toggle("fas");
  console.log(song);
  if (!favorite_songs.includes(song)) {
    favorite_songs.push(song);
  }else{
    favorite_songs = favorite_songs.filter(s=>s.filename!=song.filename);
  }
  localStorage.setItem("favs", JSON.stringify(favorite_songs));
  favorite_list();
});
//ADD FAVORITES//
function updatePlayer() {
  let song = songs[current_song_index];
  song_img_el.style = `background-image:url(tracks/thumbnails/${song.thumbnail})`;
  song_title_el.innerText = song.title;
  song_artist_el.innerText = song.artist;
  song_next_up_el.innerText =
    songs[next_song_index].title +
    " " +
    "by " +
    " " +
    songs[next_song_index].artist;
  audio_player.src = `/tracks/${song.filename}`;

  

  //Load All Songs//
  
  //Load All Songs//

  //Seekbar//
  seekbar.addEventListener(
    "change",
    function (e) {
      console.log(e.target.value);
      audio_player.currentTime = (e.target.value / 100) * audio.duration;
    },
    false
  );
  //Seekbar//
  let timer;
  audio_player.addEventListener("playing", function (e) {
    console.log('playing')
    timer = setInterval(() => {
      seekbar.value = e.target.currentTime / audio.duration * 100;
    }, 1000);
  });
  audio_player.addEventListener('pause',function(e){
    clearInterval(timer);
  })
  audio_player.addEventListener("ended", function () {
    changeSong(true);
  });

  //Random Song//

  random.addEventListener("click", function (e) {
    isRandom = !isRandom;
    if (isRandom) {
      document.querySelector(".random-on-off").textContent = "On!";
    } else {
      document.querySelector(".random-on-off").textContent = "Off!";
    }
  });

  //Random Song//

  //Repeat//

  repeatSong();
  //END Repeat//

  //regular list//
  regular_list_button.addEventListener("click", function () {
    regular_list();
  });

  //end regular list//

  //favorite List//
  favorite_list_button.addEventListener("click", function () {
    favorite_list();
  });
  //favorite List//
  //Volume//
  volumeControl();
  //Volume//
}

function togglePlaySong() {
  if (audio_player.paused) {
    /////
    // image_anim.classList.add('play_animation')
    /////
    audio_player.play();
    play_btn_icon.classList.remove("fa-play");
    play_btn_icon.classList.add("fa-pause");
  } else {
    audio_player.pause();
    //////
    // image_anim.classList.remove('play_animation')
    //////

    play_btn_icon.classList.remove("fa-pause");
    play_btn_icon.classList.add("fa-play");
  }
}

function changeSong(next = true) {
  if (next) {
    if (isRandom) {
      random_Song();
      //updatePlayer();
      //togglePlaySong();
      return;
    }
    console.log(current_song_index);
    current_song_index++;
    console.log(current_song_index);
    next_song_index = current_song_index + 1;
    console.log(next_song_index);
    if (current_song_index > songs.length - 1) {
      current_song_index = 0;
      next_song_index = current_song_index + 1;
    }
    if (next_song_index > songs.length - 1) {
      next_song_index = 0;
    }
  } else {
    current_song_index--;
    next_song_index = current_song_index + 1;

    if (current_song_index < 0) {
      current_song_index = songs.length - 1;
      next_song_index = 0;
    }
  }
  // console.log(current_song_index);
  if (!heart.classList.contains("far")) {
    heart.classList.remove("fas");
    heart.classList.add("far");
  }
  updatePlayer();
  togglePlaySong();
}

let audio = new Audio("/tracks/acousticbreeze.mp3");
// audio.play();

// volume.addEventListener("change", function (e) {
//   audio.volume = e.currentTarget.value / 100;
// });
// let testOne = document.querySelector(".test");
// testOne.addEventListener("click", (e) => {
//   console.log(e);
// });

// favorite_button.addEventListener("click", function () {
//   favorite();
// });

// function favorite() {
//   alert("it works");
// }
