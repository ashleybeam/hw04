var startBtn = document.querySelector("#start-btn");
var startEl = document.querySelector("#start");
var questionsEl = document.querySelector("#questions");
var choicesEl = document.querySelector("#question-text");
var finishEl = document.querySelector("#finsh");
var highscoreEl = document.querySelector("#highscore");
var timerEl = document.querySelector("#timer");

var questions = [{
    text: "NaN stands for: ",
    choices: ["Numbers-aNonymous", "Not-any-Nannies", "Not-a-Number", "No-absolutely-Not"],
    answer: 2
  },
  {
    text: "An array is enclosed in: ",
    choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
    answer: 3
  },
  {
    text: "Terminates the current loop and goes to the statement following the current statement: ",
    choices: ["yeet", "break", "continue", "stop"],
    answer: 1
  },
  {
    text: "The greater than/or equal operator is: ",
    choices: [">>", "<=", "+=", ">="],
    answer: 3
  },
  {
    text: "This is a value that is passed back from one function to another: ",
    choices: ["return", "class", "functionClass", "for"],
    answer: 0
  },
];

var cursor = 0;
var score = 0;
var timeLeft = 75;
var interval;

choicesEl.addEventListener("click", function (event) {
  var element = event.target;
  var question = questions[cursor];
  if (element.className === "item") {
    console.log(element);
    var id = parseInt(element.getAttribute("data-id"));
    if (questionsEl.answer === id) {
      console.log("CORRECT ANSWER");
      score++;
    } else {
      console.log("WRONG ANSWER");
    }
    cursor++;
    console.log("SCORE", score);
    renderQuestionData();
  }
});

function renderQuestionData() {
  var question = questions[cursor]
  choicesEl.innerHTML = "";
  questionsEl.textContent = "1. " + question.text;

  questionsEl.choices.forEach(function (choice, index) {
    var choiceItem = document.createElement("div");

    choiceItem.setAttribute("class", "item");
    choiceItem.setAttribute("data-id", index);
    choiceItem.textContent = choice;
    choicesEl.appendChild(choiceItem);

  });
}

function initializeTimer(){
  interval = setInterval(function(){
    timeLeft = parseInt(timerEl.getAttribute("data-time"));
    timeLeft--;
    if (timeLeft > 0) {
      timerEl.textContent = timeLeft;
    } else {
      console.log("END GAME");
      startEl.style.display = "none";
      questionsEl.style.display = "none";
      finishEl.style.display = "flex";
      highscoreEl.style.display ="none"
      clearInterval(interval);
    }  
  }, 1000);
}

startBtn.addEventListener("click", function (event) {
  startEl.style.display = "none";
  questionsEl.style.display = "flex";

  renderQuestionData();
  initializeTimer();




});