/**
 * Created by Home on 28/04/2016.
 */

var $video = document.getElementById("main-video");
var currentVolume = $video.volume;
var seekSlider = document.getElementById("seek-bar");
var volumeBar = document.getElementById("volume-fader");
var $volumeButton = $('#volume-off-on');
var $playPauseButton = $("#start-stop");
var $currentTime = document.getElementById("current-time");
var $durationTime = document.getElementById("duration-time");
var $playbackButton = document.getElementById("playback-speed-button");
var speedCounter = 0;

$video.addEventListener("timeupdate", seekTimeUpdate, false);

$("#play-button").hide();
$("#pause-button").show();
$("#volumeOff").hide();
$("#volumeOn").show();
$("#100-speed").show();
$("#50-speed").hide();
$("#150-speed").hide();

// play pause function

function playPause() {
    if ($video.paused) {
        $video.play();
        $("#play-button").hide();
        $("#pause-button").show();
    } else {
        $video.pause();
        $("#play-button").show();
        $("#pause-button").hide();
    }
}

$playPauseButton.click(function () {
    playPause();
});


// video seek

function videoSeek() {
    $video.currentTime = $video.duration * (seekSlider.value / 100);
}

$(seekSlider).change(function () {
    videoSeek();
    console.log("position changed");
});

function seekTimeUpdate() {
    var newTime = $video.currentTime * (100 / $video.duration);
    seekSlider.value = newTime;
    // console.log("real time update");

    var currentMinutes = Math.floor($video.currentTime / 60);
    var currentSeconds = Math.floor($video.currentTime - currentMinutes * 60);
    var totalMinutes = Math.floor($video.duration / 60);
    var totalSeconds = Math.floor($video.duration - totalMinutes * 60);
    if (currentSeconds < 10) {
        currentSeconds = "0" + currentSeconds;
    }
    if (totalSeconds < 10) {
        totalSeconds = "0" + totalSeconds;
    }
    var currentTime = currentMinutes + ":" + currentSeconds;
    var totalTime = totalMinutes + ":" + totalSeconds;
    $durationTime.innerHTML = totalTime;
    $currentTime.innerHTML = currentTime;
}


// volume functions

function volumeToggle() {
    currentVolume = $video.volume;
    if (currentVolume > 0) {
        $video.volume = 0;
        volumeBar.value = 0;
        $("#volumeOff").show();
        $("#volumeOn").hide();
        console.log("sound on");
    } else {
        $video.volume = 1;
        $("#volumeOff").hide();
        $("#volumeOn").show();
        console.log("sound off");
        volumeBar.value = 20;
    }
}

$volumeButton.click(function () {
    volumeToggle();
    console.log("button clicked");
});

function updateVolumeBar() {
    $video.volume = (volumeBar.value / 20);
    console.log("volume bar is changed");
}

// To add - when volumebar val = 0, change image.

$(volumeBar).on("change", function () {
    updateVolumeBar();
});


// Playback speed code

function changeSpeed() {
    if (speedCounter = 0) {
        speedCounter++;
        $("#100-speed").hide();
        $("#50-speed").hide();
        $("#150-speed").show();
        console.log("normal speed and counter is " + speedCounter);
    } else if (speedCounter = 1) {
        speedCounter++;
        $("#100-speed").hide();
        $("#50-speed").show();
        $("#150-speed").hide();
        console.log("fast speed and counter is " + speedCounter);
    } else if (speedCounter = 2) {
        $("#100-speed").show();
        $("#50-speed").hide();
        $("#150-speed").hide();
        speedCounter = 0;
        console.log("slow speed and counter is " + speedCounter);
    }
    return speedCounter;
}

$("#playback-speed-button").click(function () {
    changeSpeed();
});
// $playbackButton.children[i] gets the child element.
// treat the button's children as an array.
// each time the button is clicked cycle to the next image
// and an if statement
// if array[0] normal speed, array[1] fast speed, array[2] slow speed
// images by Daan Dirk

// Buffering Code


// Hover Code

// when mouse enters screen, div containing toolbar appear, the time bar shrinks in height
// when mouse leaves div container toolbar disappears, time bar stretches in height.


// Subtitle code


// Full screen

var elem = document.getElementById("main-video");

$("#full-screen").click(function () {
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
    } else if (elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
    }
});
// add the toolbar to fullscreen


// Transcript Code
