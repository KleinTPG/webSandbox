
const colors = ["white", "black", "red", "orange", "yellow", "green", "blue", "purple", "pink"];

const counterSpan = document.getElementById('counter_span');
let points = 0;
counterSpan.textContent = points;
let currentColor = "";

const startButton = document.getElementById('start_button');
let SpeechRecognition;
if (window.SpeechRecognition) {
    SpeechRecognition = window.SpeechRecognition;
} else if (window.webkitSpeechRecognition) {
    SpeechRecognition = window.webkitSpeechRecognition;
} else {
    console.error('Speech Recognition not supported');
}
console.log(SpeechRecognition);

const recognition = new SpeechRecognition();
recognition.continuous = true;
recognition.lang = 'en-US';
recognition.interimResults = true;


function getRandomColor() {
    const keys = Object.keys(colors);
    const randomIndex = Math.floor(Math.random() * keys.length);
    return colors[keys[randomIndex]];
}


function nextColor() {
    currentColor = getRandomColor();
    document.body.style.backgroundColor = currentColor;
    console.log("Changing color to: " + currentColor);
}




startButton.addEventListener('click', () => {
  recognition.start();
  points = 0;
  counterSpan.textContent = points;
  nextColor();
  startButton.style.display = 'none';
  let timer = 20;
  const timerElement = document.createElement('p');
  document.body.appendChild(timerElement);
  const timerInterval = setInterval(() => {
    timerElement.textContent = `Time left: ${timer} seconds`;
    if (timer <= 0) {
      clearInterval(timerInterval);
      timerElement.remove();
      recognition.stop();
      startButton.style.display = 'block';
    }
    timer--;
  }, 1000);
  
});

recognition.onresult = function(event) {
    for(let i=event.resultIndex; i<event.results.length; i++) {
        const spokenColor = event.results[i][0].transcript.toLowerCase().trim();
        console.log("Heard you say: " + spokenColor);
      
        if (spokenColor === currentColor) {
          points++;
          counterSpan.textContent = points;
          nextColor();
        }
    }

};
