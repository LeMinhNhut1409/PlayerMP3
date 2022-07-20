const song = document.getElementById("song");
const playBtn = document.querySelector(".player-inner");
const nextBtn = document.querySelector(".play-forward");
const prevBtn = document.querySelector(".play-back");
const durationTime = document.querySelector(".duration");
const remainingTime = document.querySelector(".remaining");
const rangeBar= document.querySelector(".range");
let isPlaying = true;
let indexSong = 0;
const audios = ["ChuoiNgayVangEm-ChauKhaiPhong-3500633.mp3", "KhongTronVenNua-ChauKhaiPhongACV-7197914.mp33",
"NgamHoaLeRoi-ChauKhaiPhong-4850041.mp3","Thuong-Em-Chau-Khai-Phong-ACV.mp3"];
displayTimer();
let timer;
nextBtn.addEventListener("click", function(){
 changeSong(1);
});
prevBtn.addEventListener("click", function(){
    changeSong(-1);
});
song.addEventListener("ended", handleEndedSong)
function handleEndedSong(){
    changeSong(-1);
}
function changeSong(dir){
    if(dir === 1)
    {
        //next song
        indexSong++;
        if(indexSong >= audios.length)
        {
            indexSong = 0;
        }
        isPlaying = true;
    }
    else if(dir === -1)
    {
        // prev song
        indexSong--;
        if(indexSong <= 0)
        {
            indexSong = audios.length - 1;
        }
        isPlaying = true;

    }
    song.setAttribute("src", `./audio/${audios[indexSong]}`);
    playPause();
}
playBtn.addEventListener("click", playPause);
function playPause() {
    if(isPlaying){
        song.play();
        playBtn.innerHTML = '<ion-icon name="pause"></ion-icon>';
        isPlaying = false;
        timer = setInterval(displayTimer, 500);
    }
    else{
        song.pause();
        playBtn.innerHTML = '<ion-icon name="play"></ion-icon>';
        isPlaying = true;
        clearInterval(timer);
    }
} 
function displayTimer(){
   const {duration, currentTime} = song;
   remainingTime.textContent = formatTimer(currentTime);
   rangeBar.max = duration;
   rangeBar.value = currentTime;
    if(!duration){
        durationTime.textContent = "00:00";
    } else{
        durationTime.textContent = formatTimer(duration);
    }
}
function formatTimer(number){
    const minutes = Math.floor(number / 60);
    const seconds = Math.floor(number - minutes * 60);
    return `${minutes < 10 ? '0' + minutes: minutes}:${seconds < 10 ? '0' + seconds:seconds}`;
}
rangeBar.addEventListener("change", handleChangeBar);
function handleChangeBar(){
    song.currentTime = rangeBar.value;
}