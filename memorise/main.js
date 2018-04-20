const START_AT = 4;
const WAIT_TIME = 1000;
const COLORS_ARRAY = [
    '#f44336',
    '#2196f3',
    '#ffeb3b',
    '#4caf50'
  ];

var startButton = document.querySelector('#start');
var resetButton = document.querySelector('#reset');
var heading = document.querySelector('h1');
var colorElements = document.querySelectorAll('.color');

var level = 1;
var colorsIndex = [];
var clickCount = 0;
var incorrectCount = 0;

resetButton.addEventListener('click', resetAll);

startButton.addEventListener('click', function () {
  var colorsNeeded = START_AT + level - 1;

  heading.innerHTML = 'Memorise';

  for(var i=0; i<colorsNeeded; i++) {
    var temp = Math.floor(Math.random()*COLORS_ARRAY.length);
    colorsIndex.push(temp);
  }

  var loopCounter = 0;

  var timer = setInterval(function () {
    var currentIndex = colorsIndex[loopCounter];
    var colorToggle = colorElements[currentIndex];

    colorToggle.style.opacity = 1;

    setTimeout(() => {
      colorToggle.style.opacity = 0.4;
    }, 600);

    loopCounter++;

    if(loopCounter === colorsIndex.length) {
      clearInterval(timer);
      
      setTimeout(() => {
       
        heading.innerHTML = 'Your turn';
        startButton.disabled = true;

        for(var i=0; i<colorElements.length; i++) {
          colorElements[i].addEventListener('click', checkColor);
        }

      }, WAIT_TIME);
    }
  }, WAIT_TIME);

});


// FUNCTIONS
function checkColor() {
  var colorValue = this.dataset.colorvalue;
  var answer = document.querySelectorAll('.answer');

  if(colorValue == colorsIndex[clickCount]) {
    answer[clickCount].classList.add('correct');
  }

  else {
    answer[clickCount].classList.add('incorrect');
    incorrectCount++;
  }

  answer[clickCount].style.backgroundColor = COLORS_ARRAY[colorsIndex[clickCount]];

  clickCount++;

  if(clickCount === colorsIndex.length) {
    for(var i=0; i<colorElements.length; i++) {
      colorElements[i].removeEventListener('click', checkColor);
    }


    if(incorrectCount !== 0) {
      heading.innerHTML = 'You lose';
    }

    else {
      increaseLevel();
    }
  }
}

function increaseLevel() {
  level++;
  document.querySelector('.level').innerHTML = level;

  startButton.innerHTML = 'Next';
  heading.innerHTML = 'Press next';
  
  reset();
}

function reset() {
  startButton.disabled = false;

  var patternElement = document.querySelector('.pattern');
  patternElement.innerHTML = '';

  for (var i = 0; i < START_AT + level - 1; i++) {
    var answerDiv = document.createElement('div');
    answerDiv.classList.add('answer');
    patternElement.appendChild(answerDiv);
  }

  colorsIndex = [];

  clickCount = 0;
  incorrectCount = 0;
}

function resetAll() {
  level = 1;
  document.querySelector('.level').innerHTML = level;

  startButton.innerHTML = 'Start';
  heading.innerHTML = 'Memorise';

  reset();
}

window.onload = resetAll();
