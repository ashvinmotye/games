// elements
var totalWords = document.querySelector('#totalWords');
var modal = document.querySelector('aside');
var close = document.querySelector('#close');
var ring = document.querySelector('.fa-life-ring');
var hide = document.querySelector('#hide');

// CALLING FUNCTIONS
window.onload = function() {
  totalWords.innerHTML = TOTAL;
};

close.addEventListener('click', function(e){
  var el;

  for(var i=0; i<e.path.length; i++) {
    if(e.path[i].localName === 'svg') {
      el = e.path[i];
      break;
    }
  }

  el.classList.toggle('close');
  hide.classList.toggle('blurred');
  modal.classList.toggle('invisible');
});