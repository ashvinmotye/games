// elements
var title = document.querySelector('h1');
var li = document.querySelectorAll('li');
var higher = document.querySelector('#higher');
var lower = document.querySelector('#lower');
var reset = document.querySelector('#reset');
var score = document.querySelector('#score');
var timerContainer = document.querySelector('.timer');
var seconds = document.querySelector('#seconds');
var milliseconds = document.querySelector('#milliseconds');
var bestScore = document.querySelector('#bestScore');
var bestTime = document.querySelector('#bestTime');

// numbers related
const TOTAL = 10;
var numbers = [];
var temp;
var diff = [0, 0];

// game related
var currentIndex;
var buttonId;
var playerScore = 0;
var correctClass;
var startGame = true;
var timer;
var currentTime;
var now;
var second;
var millisecond;
var combinedTime;
var time;

// storage variables
var bestPlayerScore = 0;
var bestPlayerTime = Infinity;

// generate numbers array
// and setup game
function setupGame() {
  numbers = [];
  diff = [0, 0];
  playerScore = 0;

  // set title to original
  title.innerHTML = "HIGHER LOWER";

  // generate array of 10 numbers
  for (var i = 0; i < TOTAL; i++) {
    do {
      temp = Math.floor(Math.random() * 10) + 1;
    } while (numbers.indexOf(temp) !== -1);

    numbers.push(temp);
  }

  // find difference between 2 consecutive numbers
  for (var j = 1; j < numbers.length - 1; j++) {
    diff[j + 1] = numbers[j + 1] - numbers[j];
  }

  // first and second value added to list
  li[0].innerHTML = numbers[0];
  li[1].innerHTML = numbers[1];

  // assign current index position
  currentIndex = 1;

  // initialise rest of list to unknown
  // remove any attached css class
  for (var k=currentIndex+1; k<TOTAL; k++) {
    li[k].innerHTML = '?';
    li[k].className = '';
  }

  // buttons are clickable
  higher.disabled = false;
  lower.disabled = false;

  // reinitialise score to 0
  score.innerHTML = playerScore;

  // reinitialise startGame to true
  startGame = true;

  // reinitialise time to zero
  seconds.innerHTML = "00";
  milliseconds.innerHTML = 0;

  // stop timer
  clearInterval(timer);

  // timer color back to normal
  timerContainer.classList.remove('correct');

  // check local storage for previous scores
  checkStorage();
}

// update the title based on score
function updateTitle(score, total) {
  var heading = "";
  var maxScore = total - 2;

  if(score === maxScore) {
    heading = "PERFECT!";
  }

  else if(score === maxScore - 1 || score === maxScore - 2) {
    heading = "so close!";
  }

  else {
    heading = "try again";
  }

  return heading;
}

function addZero(x) {
  if(x < 10) {
    return "0"+x;
  }

  return x;
}

function buttonClick() {
  // check if first click to start game
  // at first click
  // startGame = true
  if(startGame) {
    // get the staring time
    var startingTime = new Date();

    timer = setInterval(function() {
      currentTime = new Date();
      now = currentTime - startingTime;

      millisecond = Math.floor(now/100)%10;
      second = Math.floor(now / 1000) % 60;

      milliseconds.innerHTML = millisecond;
      seconds.innerHTML = addZero(second);

    }, 100);

    startGame = false;
  }

  // increment current index position
  currentIndex++;

  // initialise class to incorrect
  correctClass = 'incorrect';

  // check which button is clicked
  buttonId = this.id;

  // diff at currentIndex must be
  // negative
  if(buttonId === 'lower') {
    if(diff[currentIndex] < 0) {
      playerScore = Number(score.innerHTML) + 1;
      correctClass = 'correct';
    }
  }
  
  // positive
  else if(buttonId === 'higher') {
    if (diff[currentIndex] > 0) {
      playerScore = Number(score.innerHTML) + 1;
      correctClass = 'correct';
    }
  }

  // show current number in the list
  // update score
  li[currentIndex].innerHTML = numbers[currentIndex];
  li[currentIndex].classList.add(correctClass);
  score.innerHTML = playerScore;

  // when game over
  // buttons disabled
  if (currentIndex === TOTAL - 1) {
    higher.disabled = true;
    lower.disabled = true;

    // update header based on score
    title.innerHTML = updateTitle(playerScore, TOTAL);

    // update best score
    if (playerScore > bestPlayerScore) {
      bestPlayerScore = playerScore;
      bestScore.innerHTML = bestPlayerScore;
      
      // save score in localStorage
      localStorage.setItem('bestScore', bestPlayerScore);

      // if new high score
      // update best time
      combinedTime = second + "." + millisecond;
      time = Number(combinedTime);
      bestPlayerTime = time;
      bestTime.innerHTML = bestPlayerTime;

      // save time in localStorage
      localStorage.setItem('bestTime', bestPlayerTime);

      // make timer green to indicate new record
      timerContainer.classList.add('correct');

    }

    // if same high score
    // compare time
    else if (playerScore === bestPlayerScore) {
      combinedTime = second + "." + millisecond;
      time = Number(combinedTime);

      if (time <= bestPlayerTime) {
        bestPlayerTime = time;
        bestTime.innerHTML = bestPlayerTime;

        // save time in localStorage
        localStorage.setItem('bestTime', bestPlayerTime);

        // make timer green to indicate new record
        timerContainer.classList.add('correct');
      }
    }

    // stop timer
    clearInterval(timer);
  }
}

// check if localStorage has previous scores
function checkStorage() {
  if(window.localStorage.getItem('bestScore')) {
    bestPlayerScore = Number(localStorage.getItem('bestScore'));
    bestScore.innerHTML = bestPlayerScore;

    bestPlayerTime = Number(localStorage.getItem('bestTime'));
    bestTime.innerHTML = bestPlayerTime;
  }
}

// CALLING THE FUNCTIONS
window.onload = setupGame();

// button click event
higher.addEventListener('click', buttonClick);
lower.addEventListener('click', buttonClick);
reset.addEventListener('click', setupGame);