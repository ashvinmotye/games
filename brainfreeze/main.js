var colors = [
  "red",
  "blue",
  "yellow",
  "green",
  "purple",
  "orange",
  "brown",
  "black",
  "grey",
  "pink",
  "cyan",
  "white"
];

const TOTAL = colors.length;

var correctColor, timer;
var hasStarted = false;
var streak = 0;
var maxStreak = 0;
var hasClicked = false;
var roundTime = 0.5;

var content = document.querySelector('#colors');
var colorDivs = document.querySelectorAll('.color');
var header = document.querySelector('h1');
var streakSpan = document.querySelector('#streak');
var maxStreakSpan = document.querySelector('#maxStreak');
var speedController = document.querySelector('input[type="range"]');
var userSpeed = document.querySelector('#userSpeed');

function colorize() {
  correctColor = colors[getRandomNumber(TOTAL)];
  setHeader();
  setDivColor();  

  if(!hasClicked) {
    if (streak >= maxStreak) {
      maxStreak = streak;
      maxStreakSpan.innerHTML = maxStreak;
    }

    streak = 0;
    streakSpan.innerHTML = streak;
  }

  hasClicked = false;
}

function setHeader() {
  var heading = colors[getRandomNumber(TOTAL)];
  header.innerHTML = heading;
  header.style.color = correctColor;
}

function setDivColor() {
  var colorsArray = getColors();

  for(var i=0; i<colorDivs.length; i++) {
    colorDivs[i].style.backgroundColor = colorsArray[i];
  }
}

function getColors() {
  var shuffledColorsArray = [];
  var temp, tempColor;

  for(var i=0; i<colors.length; i++) {
    do {
      temp = getRandomNumber(colors.length);
      tempColor = colors[temp];
    } while(shuffledColorsArray.indexOf(tempColor) !== -1);

    shuffledColorsArray.push(colors[temp]);
  }

  return shuffledColorsArray;
}

function getRandomNumber(max) {
  return Math.floor(Math.random()*max);
}

function checkColor() {
  var clickedColor = this.style.backgroundColor;
  hasClicked = true;

  if(clickedColor === correctColor) {
    streak++;
    streakSpan.innerHTML = streak;
  }

  else {
    if (streak >= maxStreak) {
      maxStreak = streak;
      maxStreakSpan.innerHTML = maxStreak;
    }

    streak = 0;
    streakSpan.innerHTML = streak;
  }

  colorize();
  clearInterval(timer);
  timer = setInterval(colorize, Number(roundTime) * 1000);
}

function setSpeed() {
  roundTime = this.value;
  userSpeed.innerHTML = Number(roundTime).toFixed(1);

  streak = 0;
  streakSpan.innerHTML = streak;

  clearInterval(timer);
  timer = setInterval(colorize, Number(roundTime) * 1000);
}

for(var i=0; i<colorDivs.length; i++) {
  colorDivs[i].addEventListener('click', checkColor);
}

speedController.addEventListener('change', setSpeed);

window.onload = function() {
  userSpeed.innerHTML = roundTime;
  speedController.value = roundTime;
};