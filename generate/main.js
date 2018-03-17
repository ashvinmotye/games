const TOTAL = 6;
var hasStarted = false;

var container = document.querySelector('.container');
var numberElements = NodeList;
var numbersArray;
var temp;

function addBackgroundColor(x) {
  var bgColor;

  if (x <= 10) {
    bgColor = '#F44336';
  } else if (x > 10 && x <= 20) {
    bgColor = '#2196F3';
  } else if (x > 20 && x <= 30) {
    bgColor = '#FFEB3B';
  } else {
    bgColor = '#4CAF50';
  }

  return bgColor;
}

function createNumberElements() {
  for (var i = 0; i < TOTAL; i++) {
    div = document.createElement('div');
    div.classList.add('number');
    container.appendChild(div);
  }
}

function populate() {
  if(!hasStarted) {
    container.innerHTML = '';
    createNumberElements();
    numberElements = document.querySelectorAll('.number');
    hasStarted = true;
  }

  numbersArray = [];

  for(var i=0; i<numberElements.length; i++) {
    do {
      temp = Math.floor(Math.random()*40)+1;
    } while (numbersArray.indexOf(temp) !== -1);

    numbersArray.push(temp);
    numberElements[i].innerHTML = temp;
    numberElements[i].style.backgroundColor = addBackgroundColor(temp);
  }
}

function generate(e) {
  if (e.code === 'Space' || e.keyCode === 32) {
    populate();
  }  
}

window.addEventListener('keypress', generate);

//listen to shake event
var shakeEvent = new Shake({ threshold: 15 });
shakeEvent.start();
window.addEventListener('shake', generate, false);

//stop listening
function stopShake() {
  shakeEvent.stop();
}