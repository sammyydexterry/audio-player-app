const songImage = document.getElementById("song-image");
const songTitle = document.getElementById("song-title");
const songArtist = document.getElementById("song-artist");

const songSlider = document.getElementById("song-slider");

const playpauseButton = document.getElementById("playpause");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const shuffleButton = document.getElementById("shuffle");
const loopButton = document.getElementById("loop");

const minimizeButton = document.getElementById("minimize");
const closeButton = document.getElementById("close");

const songs = [
    {
        image: "./music & covers/cover1.jpg",
        name: "Flim",
        artist: "Aphex Twin",
        audio: "./music & covers/Flim - Aphex Twin.mp3"
    },
    {
        image: "./music & covers/cover2.jpg",
        name: "Gee",
        artist: "SNSD",
        audio: "./music & covers/Gee - SNSD.mp3"
    },
    {
        image: "./music & covers/cover3.jpg",
        name: "Main Menu",
        artist: "Wii Party",
        audio: "./music & covers/Main Menu - Wii Party.mp3"
    },
    {
        image: "./music & covers/cover4.jpg",
        name: "New Look",
        artist: "Secret Potion",
        audio: "./music & covers/New Look - Secret Potion.mp3"
    },
    {
        image: "./music & covers/cover5.jpg",
        name: "Passionfruit",
        artist: "NMIXX",
        audio: "./music & covers/Passionfruit - NMIXX.mp3"
    },
    {
        image: "./music & covers/cover6.jpg",
        name: "Girl Front",
        artist: "ODD EYE CIRCLE",
        audio: "./music & covers/Girl Front - ODD EYE CIRCLE.mp3"
    },
    {
        image: "./music & covers/cover7.jpg",
        name: "Identification",
        artist: "Infinity Frequencies",
        audio: "./music & covers/Identification - Infinity Frequencies.mp3"
    },
    {
        image: "./music & covers/cover8.png",
        name: "Butterfly",
        artist: "LOOΠΔ",
        audio: "./music & covers/Butterfly - LOOΠΔ.mp3"
    },
    {
        image: "./music & covers/cover9.png",
        name: "SO BAD",
        artist: "STAYC",
        audio: "./music & covers/SO BAD - STAYC.mp3"
    },
    {
        image: "./music & covers/cover10.png",
        name: "LEASE",
        artist: "Takeshi Abo",
        audio: "./music & covers/LEASE - Takeshi Abo.mp3"
    },
    {
        image: "./music & covers/cover11.png",
        name: "Hi High",
        artist: "LOOΠΔ",
        audio: "./music & covers/Hi High - LOOΠΔ.mp3"
    },
    {
        image: "./music & covers/cover12.png",
        name: "Alchohol-Free",
        artist: "TWICE",
        audio: "./music & covers/Alcohol-Free - TWICE.mp3"
    },
    {
        image: "./music & covers/cover13.jpg",
        name: "Attention (250 Remix)",
        artist: "NewJeans",
        audio: "./music & covers/Attention (250 Remix) - NewJeans.mp3"
    },
    {
        image: "./music & covers/cover14.jpg",
        name: "Dire, Dire Docks",
        artist: "Super Mario 64",
        audio: "./music & covers/Dire, Dire Docks - Super Mario 64.mp3"
    },
    {
        image: "./music & covers/cover15.jpeg",
        name: "Sweet Sandy Coast",
        artist: "SupaBubba",
        audio: "./music & covers/Sweet Sandy Coast - SupaBubba.mp3"
    },
];

const audio = document.createElement("audio");
let currentSongIndex = 0;
let nextSongIndex = currentSongIndex + 1;
updateSong();

prevButton.addEventListener("click", function() {
    if (currentSongIndex <= 0) {
        currentSongIndex = 15;
    }
    currentSongIndex--;
    updateSong();
    audio.play();
});

nextButton.addEventListener("click", function() {
    if (currentSongIndex == songs.length - 1) {
        currentSongIndex = -1;
    }
    currentSongIndex++;
    updateSong();
    audio.play();
});

playpauseButton.addEventListener("click", function() {
    if (audio.paused) {
        audio.play();
        removeEventListener("click", playpauseButton);
        playpauseButton.classList.remove("fa-circle-play");
        playpauseButton.classList.add("fa-circle-pause");
    } else {
        audio.pause();
        removeEventListener("click", playpauseButton);
        playpauseButton.classList.remove("fa-circle-pause");
        playpauseButton.classList.add("fa-circle-play");
    }
});

function updateSong() {
    const song = songs[currentSongIndex];
    songImage.src = song.image;
    songTitle.innerText = song.name;
    songArtist.innerText = song.artist;

    audio.src = song.audio;
    audio.onloadedmetadata = function() {
        songSlider.value = 0;
        songSlider.max = audio.duration;
    };
}

songSlider.addEventListener("change", function() {
    audio.currentTime = songSlider.value;
});

function updateSlider() {
    songSlider.value = audio.currentTime;
}

setInterval(updateSlider, 1000);

closeButton.addEventListener("click", function() {
    window.close();
});

shuffleButton.addEventListener("click", function() {
    songs.forEach(shuffle);
});

function shuffle() {
    const randomIndex = Math.floor(Math.random() * songs.length);
    const currentIndex = songs.indexOf(this);  
    [songs[currentIndex], songs[randomIndex]] = [songs[randomIndex], songs[currentIndex]];
}

loopButton.addEventListener("click", function() {
    if (audio.loop) {
        audio.loop = false;
        loopButton.classList.remove("active");
    } else {
        audio.loop = true;
        loopButton.classList.add("active");
    }
});

audio.addEventListener("ended", function() {
    if (!audio.loop) {
        nextButton.click();
    }
});
