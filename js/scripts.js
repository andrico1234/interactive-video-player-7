/**
 * Created by Home on 28/04/2016.
 */

var $video = document.getElementById("main-video");
var currentVolume = $video.volume;
var seekSlider = $(document.getElementById("seek-bar"));
var bufferSlider = $(document.getElementById("buffer-bar"));
var volumeBar = document.getElementById("volume-fader");
var $volumeButton = $('#volume-off-on');
var $playPauseButton = $("#start-stop");
var $fullScreen = $(document.getElementById("full-screen-button"));
var $currentTime = document.getElementById("current-time");
var $durationTime = document.getElementById("duration-time");
var $videoInterface = document.getElementsByClassName("additional-controls");
var speedCounter = 0;
var $captionButton = $(document.getElementById("subtitles"));
var currentSeconds;
var transcriptParent = document.getElementById("transcript-parent");

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

$(function () {
    seekSlider.slider({
        range: "min",
        value: 0,
        min: 1,
        max: 100
    })
});

$(function () {
    bufferSlider.slider({
        range: "min",
        value: 0,
        min: 0,
        max: 100,
        disabled: true
    });
});

function updateBuffer() {
    if ($video.buffered.length > 0) {
        var percent = ($video.buffered.end(0) / $video.duration) * 100;
        bufferSlider.slider("value", percent);
    }
}

function changeTime() {
    $video.currentTime = $video.duration * (seekSlider.slider("value") / 100);
}

$($video).bind("progress", function () {
    // if ($video.buffered.length > 0) {
    //     var percent = ($video.buffered.end(0) / $video.duration) * 100;
    //     bufferSlider.slider("value", percent);
    // }
    updateBuffer();
});

// buffered end updates whenever the video has the time changed. create a new function

$video.addEventListener("timeupdate", function () {

    var newTime = $video.currentTime * (100 / $video.duration);
    seekSlider.slider("value", newTime);

    var currentMinutes = Math.floor($video.currentTime / 60);
    currentSeconds = Math.floor($video.currentTime - currentMinutes * 60);
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

    for (var i = 0; i < transcriptParent.children.length; i++) {
        if (transcriptParent.children[i].dataset.time <= currentSeconds) {
            $(transcriptParent.children[i]).addClass("highlighted");
        }
        if (transcriptParent.children[i].dataset.end <= currentSeconds) {
            $(transcriptParent.children[i]).removeClass("highlighted");
        }
    }
});

$("p span").click(function () {
    console.log(this.dataset.time);
    $video.currentTime = this.dataset.time;
    $(transcriptParent.children).removeClass("highlighted");

});

//
// seekSlider.mousedown(function () {
//     playPause();
//     changeTime();
//
// });

// seekSlider.mouseup(function () {
//     playPause();
//     // changeTime();
// });

seekSlider.click(function () {
    changeTime();
});
// issue: seekSlider doesn't work when video pauses when bar is clicked.

// volume functions

function volumeToggle() {
    currentVolume = $video.volume;
    if (currentVolume > 0) {
        $video.volume = 0;
        volumeBar.value = 0;
        $("#volumeOff").show();
        $("#volumeOn").hide();
        // console.log("sound on");
    } else {
        $video.volume = 1;
        $("#volumeOff").hide();
        $("#volumeOn").show();
        // console.log("sound off");
        volumeBar.value = 20;
    }
}

$volumeButton.click(function () {
    volumeToggle();
});

function updateVolumeBar() {
    $video.volume = (volumeBar.value / 20);
}

$(volumeBar).on("change", function () {
    updateVolumeBar();
});

// Playback speed code

function changeSpeed() {
    if (speedCounter == 0) {
        $("#100-speed").hide();
        $("#50-speed").hide();
        $("#150-speed").show();
        $video.playbackRate = 1.5;
        speedCounter++;
    } else if (speedCounter == 1) {
        $("#100-speed").hide();
        $("#50-speed").show();
        $("#150-speed").hide();
        $video.playbackRate = 0.5;
        speedCounter++;
    } else {
        $("#100-speed").show();
        $("#50-speed").hide();
        $("#150-speed").hide();
        $video.playbackRate = 1;
        speedCounter = 0;
    }
}

$("#playback-speed-button").click(function () {
    changeSpeed();
});
// images by Daan Dirk


// Hover Code

$(document).ready(function () {
    $($videoInterface).fadeOut(100);
});

$(".video-container").hover(function () {
    $($videoInterface).fadeIn(100);
}, function () {
    $($videoInterface).fadeOut(100);
});


// Subtitle code

function toggleSubtitles() {
    if ($video.textTracks[0].mode == 'showing') {
        $video.textTracks[0].mode = "hidden";
    } else {
        $video.textTracks[0].mode = "showing";
    }
}

$captionButton.click(function () {
    toggleSubtitles();
});


// Full screen

$fullScreen.click(function () {
    if ($video.requestFullscreen) {
        $video.requestFullscreen();
    } else if ($video.mozRequestFullScreen) {
        $video.mozRequestFullScreen(); // Firefox
    } else if ($video.webkitRequestFullscreen) {
        $video.webkitRequestFullscreen(); // Chrome and Safari
    }
});

// Add stronger click and drag functionality
// When unmute is clicked, return the volume to its previous value (currently resets to full value
// Make the buffer bar a little more noticeable. 
