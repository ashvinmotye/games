// ELEMENTS
var heading = document.querySelector('#calculation');
var solutionContainer = document.querySelector('#solution-container');
var levels = document.querySelectorAll('.levels button');
var next = document.querySelector('#start');
var score = document.querySelector('#score');
var attempts = document.querySelector('#attempts');
var reset = document.querySelector('#reset');
var solutionElements = NodeList;

// GAME RELATED
var signs = ['+', '-', '*'];
var hasStarted = false;
var generatedEquation;
var currentLevel = 1;
var correctValue;
var correctIndex;
var currentScore = 0;
var currentAttempt = 0;

// FUNCTIONS
function getRandomNumbersArray(length, max, zeroIncluded) {
  var x = [];

  if(zeroIncluded) {
    var temp;

    for (var i = 0; i < length; i++) {
      do {
        temp = Math.floor(Math.random() * max);
      } while (x.indexOf(temp) !== -1);

      x.push(temp);
    }
  }

  else {
    for (var j = 0; j < length; j++) {
      x.push(Math.floor(Math.random() * max) + 1);
    }
  }

  return x;
}

function generateEquation() {
  var numbers = getRandomNumbersArray(4, 10, false);
  var signsIndex = getRandomNumbersArray(3, 3, true);
  var equation = '';

  for(var i=0; i<signsIndex.length; i++) {
    equation += numbers[i] + signs[signsIndex[i]];

    if(i===signsIndex.length-1) {
      equation += numbers[i+1];
    }
  }

  return equation;
}

function populateSolutions(eqt) {
  correctValue = eval(eqt);
  var solutions = document.querySelectorAll('.solution .number');
  var solutionsArray = [];
  var indices = getRandomNumbersArray(solutions.length, solutions.length, true);

  correctIndex = Math.floor(Math.random()*indices.length);
  var offset = correctIndex;
  var currentItem;

  for(var i=0; i<indices.length; i++) {
    currentItem = correctValue - offset;
    solutionsArray.push(currentItem);
    solutions[i].innerHTML = currentItem;
    offset--;
  }
}

function checkLevel() {
  var level = Number(this.dataset.level);
  var numberOfElements = 4 * level;
  
  if(level !== currentLevel) {
    currentLevel = level;

    toggleClass();
    this.classList.add('selected');

    createSolutionElements(numberOfElements);

    if(generatedEquation !== undefined) {
      populateSolutions(generatedEquation);
    }

    getSolutionElements();

    incrementAttempts();
  }
}

function createSolutionElements(elements) {
  solutionContainer.innerHTML = "";

  for (var i = 0; i < elements; i++) {
    var div = document.createElement('div');
    var p = document.createElement('p');

    div.classList.add('solution');
    p.classList.add('number');

    div.appendChild(p);
    solutionContainer.appendChild(div);
  }
}

function toggleClass() {
  for (var i = 0; i < levels.length; i++) {
    levels[i].classList.remove('selected');
  }
}

function incrementAttempts() {
  currentAttempt++;
  attempts.innerHTML = currentAttempt;
}

function disableButtons(state) {
  for (var i = 0; i < levels.length; i++) {
    levels[i].disabled = state;
  }
}

function updateScore(choice) {
  if(correctValue === choice) {
    currentScore++;
    score.innerHTML = currentScore;
    return true;
  }

  return false;
}

function checkResult() {
  var userChoice = Number(this.innerText);

  var isCorrect = updateScore(userChoice);

  if(isCorrect) {
    this.classList.add('correct');
  } else {
    this.classList.add('incorrect');
    solutionElements[correctIndex].classList.add('correct');
  }

  for (var i = 0; i < solutionElements.length; i++) {
    solutionElements[i].removeEventListener('click', checkResult);
    solutionElements[i].style.cursor = 'not-allowed';
    solutionElements[i].classList.add('fixed');
  }
}


function getSolutionElements() {
  solutionElements = document.querySelectorAll('.solution');

  for(var i=0; i<solutionElements.length; i++) {
    solutionElements[i].addEventListener('click', checkResult);
  }
}

function init() {
  hasStarted = false;
  currentScore = 0;
  currentAttempt = 0;
  score.innerHTML = currentScore;
  attempts.innerHTML = currentAttempt;
  currentLevel = 1;
  createSolutionElements(currentLevel * 4);
  toggleClass();
  levels[0].classList.add('selected');
  heading.innerHTML = "MATHS WIZ";
  next.innerHTML = "Start";
  disableButtons(true);
}

// EVENT LISTENERS
next.addEventListener('click', function() {
  if(!hasStarted) {
    this.innerHTML = 'Next';
    disableButtons(false);
    hasStarted = true;
  }

  generatedEquation = generateEquation();
  heading.innerHTML = generatedEquation;
  createSolutionElements(currentLevel*4);
  populateSolutions(generatedEquation);
  getSolutionElements();

  incrementAttempts();
});

for(var i=0; i<levels.length; i++) {
  levels[i].addEventListener('click', checkLevel);
}

reset.addEventListener('click', function () {
  init();
});

// CALLS
window.onload = init();