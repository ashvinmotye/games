function speak(text) {
  // create a speechSynthesis reference
  var speech = window.speechSynthesis;

  // get all voices
  var voices = speech.getVoices();

  // english voices
  var english = [];
  for (var i = 0; i < voices.length; i++) {
    var v = voices[i].voiceURI;

    // check for English language
    if (v.indexOf('English') !== -1) {
      english.push(voices[i]);
    }
  }

  // get a voice
  //taking the first one available at index 0
  var myVoice = english[0];

  // creates the content of the speech
  // output holds the text to speak
  var output = new SpeechSynthesisUtterance(text);

  // set the voice to myVoice
  output.voice = myVoice;

  // say the text
  speech.speak(output);
}
