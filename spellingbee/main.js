// ELEMENTS
// buttons
var sayWord = document.querySelector('#sayWord');
var sayDefinition = document.querySelector('#sayDefinition');
var saySentence = document.querySelector('#saySentence');
var submissionButton = document.querySelector('button[type="submit"]');
// input
var input = document.querySelector('input[type="text"]');
// score related
var levelIndicator = document.querySelector('#level');
var timeIndicator = document.querySelector('#time');
var completedIndicator= document.querySelector('#completed');
var attemptedIndicator = document.querySelector('#attempted');
var wordCount = document.querySelector('#word');
var definitionCount = document.querySelector('#definition');
var sentenceCount = document.querySelector('#example');
var correctSpelling = document.querySelector('#correctSpelling');
var headings = document.querySelectorAll('h1');
// time
var time = document.querySelector('#time');

// VARIABLES
// general
const TOTAL = data.length;
const MAX_WORD_COUNT = 3;
const MAX_DEFINITION_COUNT = 2;
const MAX_SENTENCE_COUNT = 2;
const TIME_LIMIT = 30;
var wordsList = [];
// game related
var currentIndex = 0;
var correctCount = 0;
var timer;
var isStarting = true;
var isIncorrect = false;

// FUNCTIONS
// create an array of random indices of the words
function generateWordsList() {
  var temp;

  for(var i=0; i<TOTAL; i++) {
    do {
      temp = Math.floor(Math.random()*TOTAL);
    } while(wordsList.indexOf(temp) !== -1);

    wordsList.push(temp);
  }
}

// say the word
// start timer if game is starting
// enable input and submission
// focus on the input
function speakWord() {
  // if at start of game
  // start timer
  // enable input and subimission
  if(isStarting) {
    startTimer();
    input.disabled = false;
    submissionButton.disabled = false;
    isStarting = false;
  }

  // focus on input
  input.focus();

  // get the property requested
  var property = this.dataset.property;

  // decrease speaking times available
  updateSpeechCounter(property);
  
  // get the requested text
  var wordIndex = wordsList[currentIndex];
  var text = data[wordIndex][property];

  speak(text);
}

// update speech counter
function updateSpeechCounter(property) {
  if(property === 'word') {
    wordCount.innerHTML = Number(wordCount.innerHTML)-1;

    if(Number(wordCount.innerHTML) === 0) {
      sayWord.disabled = true;
    }
  }

  else if(property === 'definition') {
    definitionCount.innerHTML = Number(definitionCount.innerHTML)-1;

    if(Number(definitionCount.innerHTML) === 0) {
      sayDefinition.disabled = true;
    }
  }

  else if(property === 'example') {
    sentenceCount.innerHTML = Number(sentenceCount.innerHTML)-1;

    if(Number(sentenceCount.innerHTML) === 0) {
      saySentence.disabled = true;
    }
  }
}

// reset all counts to default
// enable all buttons and input
function init() {
  wordCount.innerHTML = MAX_WORD_COUNT;
  definitionCount.innerHTML = MAX_DEFINITION_COUNT;
  sentenceCount.innerHTML = MAX_SENTENCE_COUNT;
  input.value = '';
  correctSpelling.innerHTML = '';
  time.innerHTML = TIME_LIMIT;
  isStarting = true;
  disableButtons(false);
  input.disabled = true;
  submissionButton.disabled = true;
  isIncorrect = false;
}

// check if spelling is correct
// stop the clock
// move the current index to next word
// function runs on form submit
// update completed and attempted words
// here completed = correctCount
// and attempted = currentIndex
function checkSpelling() {
  // eliminate leading and trailing whitespaces using trim()
  var spelling = input.value.trim();

  // if input is blank, don't submit
  if(spelling === '') {
    return false;
  }

  var wordIndex = wordsList[currentIndex];
  var text = data[wordIndex].word;

  // if correct
  // move to the next word
  // reset speech counters to default
  // increment count of correct words
  // check if level needs increase
  // level increases after 10 correct words
  if(spelling === text) {
    speak('Correct');
    currentIndex++;
    correctCount++;
    init();

    // update level reached
    if(correctCount % 10 === 0) {
      levelIndicator.innerHTML = Number(levelIndicator.innerHTML)+1;
    }

    // check if user has guessed all right words
    // level = ultimate champion trophy
    // change h1 color to gold
    // disable all buttons
    if(correctCount === TOTAL) {
      levelIndicator.innerHTML = '<i class="fas fa-trophy" style="color: gold;"></i>';

      for(var i=0; i<headings.length; i++) {
        headings[i].style.color = "gold";
      }

      disableButtons(true);

      correctSpelling.innerHTML = "GAME COMPLETE!";
    }

    // update number of correct spelling
    completedIndicator.innerHTML = correctCount;
  }

  // output correct spelling
  // disable buttons
  // prevent resubmission of word by disabling the input
  // set isIncorrect to true
  else {
    speak('Incorrect');

    disableButtons(true);

    isIncorrect = true;

    correctSpelling.innerHTML = text+"<br><span id='nextWord' onclick='currentIndex++; updateAttempts(); init();'>next word</span>";
  }

  // stop the clock
  clearInterval(timer);

  // update number of attempts
  updateAttempts();
}

// update attempted words
function updateAttempts() {
  attemptedIndicator.innerHTML = currentIndex;
}

// timing
function startTimer() {
  timer = setInterval(function(){
    time.innerHTML = addZero(Number(time.innerHTML)-1);

    if(Number(time.innerHTML) === 0) {
      clearInterval(timer);

      var wordIndex = wordsList[currentIndex];
      var text = data[wordIndex].word;

      speak('Time up');

      disableButtons(true);

      correctSpelling.innerHTML = text+"<br><span id='nextWord' onclick='currentIndex++; updateAttempts(); init();'>next word</span>";
    }
  }, 1000);
}

function addZero(x) {
  if(x<10) {
    return '0'+x;
  }

  return x;
}

// disabling and enabling buttons
function disableButtons(flag) {
  if(flag === true) {
    sayWord.disabled = true;
    sayDefinition.disabled = true;
    saySentence.disabled = true;
    input.disabled = true;
    submissionButton.disabled = true;
  }

  else {
    sayWord.disabled = false;
    sayDefinition.disabled = false;
    saySentence.disabled = false;
    input.blur();
  }
}

// CALLING FUNCTIONS
window.onload = function() {
  generateWordsList();
  init();
};

sayWord.addEventListener('click', speakWord);
sayDefinition.addEventListener('click', speakWord);
saySentence.addEventListener('click', speakWord);

window.addEventListener('keypress', function(e) {
  if(e.charCode == 13 && (isStarting || isIncorrect)) {
    if(isIncorrect) {
      currentIndex++;
      init();
    }

    sayWord.click();
  }
});
