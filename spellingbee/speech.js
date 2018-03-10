function speak(text) {
  // create a speechSynthesis reference
  var speech = window.speechSynthesis;

  // get a voice
  //taking the first one available at index 0
  var myVoice = speech.getVoices()[0];

  // creates the content of the speech
  // output holds the text to speak
  var output = new SpeechSynthesisUtterance(text);

  // set the voice to myVoice
  output.voice = myVoice;

  // say the text
  speech.speak(output);
}