"use strict";

var video1 = document.getElementById('video1'); // ideally, this would be more specific. What if there was more than one video?

// Buttons
var playButton = document.querySelector(".play-pause");
var muteButton = document.getElementById("mute");
var fullScreenButton = document.getElementById("full_screen");

// Sliders
var seekBar = document.getElementById("seek_bar");
var seekCurrenTime = document.getElementById("seek_current_time");
var volumeBar = document.getElementById("volume_bar");

//Play/pause
playButton.addEventListener('click', function () {
	if (video1.paused === true) {
		video1.play();
		playButton.innerHTML = "Pause";
		playButton.classList.add("active");
	} else {
		video1.pause();
		playButton.innerHTML = "Play";
		playButton.classList.remove("active");
	}
});

//mute
muteButton.addEventListener("click", function () {
	if (video1.muted === false) {
		video1.muted = true;
		muteButton.innerHTML = "Unmute";
		muteButton.classList.add("active");
	} else {
		video1.muted = false;
		muteButton.innerHTML = "Mute";
		muteButton.classList.remove("active");
	}
});

// full-screen button
fullScreenButton.addEventListener("click", function () {
	if (video1.requestFullscreen) {
		video1.requestFullscreen();
	} else if (video1.mozRequestFullScreen) {
		video1.mozRequestFullScreen(); // Firefox
	} else if (video1.webkitRequestFullscreen) {
		video1.webkitRequestFullscreen(); // Chrome and Safari
	}
});

// Event listener for the seek bar
seekBar.addEventListener("change", function () {
	// Calculate the new time
	// var time = video1.duration * (seekBar.value / 100);
	var time = formatTime(video1.duration);
	// Update the video time
	video1.currentTime = time;
});

// Update the seek bar as the video plays
video1.addEventListener("timeupdate", function () {
	// Calculate the slider value
	var sliderValue = 100 / video1.duration * video1.currentTime;
	var sliderValueTime = 1 / video1.duration * video1.currentTime;
	// Update the slider value
	seekBar.value = sliderValue;
	seekCurrenTime.innerHTML = sliderValueTime.toFixed(2);
});

// Pause the video when the slider handle is being dragged
seekBar.addEventListener("mousedown", function () {
	video1.pause();
});

// Play the video when the slider handle is dropped
seekBar.addEventListener("mouseup", function () {
	video1.play();
});

// Event listener for the volume bar
volumeBar.addEventListener("change", function () {
	// Update the video volume
	video1.volume = volumeBar.value;
});

var formatTime = function formatTime(s) {
	var m = 0;
	var h = 0;
	s = Math.floor(s);

	while (s >= 60) {
		s -= 60;
		m++;
	}

	while (m >= 60) {
		m -= 10;
		h++;
	}

	s = String(s);
	s = s.padStart(2, "0");

	if (h) {
		m = String(m);
		m = m.padStart(2, "0");
		return h + ":" + m + ":" + s;
	} else {
		return m + ":" + s;
	}
};

// video1.currentTime = video1.currentTime -= 10

// progressbar.style.width = (video1.currentTime / video1.duration) * 100 + "%";
//# sourceMappingURL=main.js.map
