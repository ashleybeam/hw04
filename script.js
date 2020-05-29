var startBtn = document.querySelector("#start-btn");
var playAgainBtn = document.querySelector("#playAgain-btn");
var highScoreBtn = document.querySelector("#highScores-btn");
var startEl = document.querySelector("#start");
var questionsEl = document.querySelector("#questions");
var choicesEl = document.querySelector("#questions");
var finishEl = document.querySelector("#finish");
var highscoreEl = document.querySelector("#highscore");
var timerEl = document.querySelector("#timer");
var scoreEl = document.querySelector("#score");

var questions = [{
    text: "NaN stands for? ",
    choices: ["Numbers-aNonymous", "Not-any-Nannies", "Not-a-Number", "No-absolutely-Not"],
    answer: 2
  },
  {
    text: "An array is enclosed in? ",
    choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
    answer: 3
  },
  {
    text: "Terminates the current loop and goes to the statement following the current statement? ",
    choices: ["yeet", "break", "continue", "stop"],
    answer: 1
  },
  {
    text: "The greater than/or equal operator is? ",
    choices: [">>", "<=", "+=", ">="],
    answer: 3
  },
  {
    text: "This is a value that is passed back from one function to another? ",
    choices: ["return", "class", "functionClass", "for"],
    answer: 0
  },
];

var i = 0;
var score = 0;
var timeLeft = 75;
var interval;
var initials = "";
var highScores = JSON.parse(localStorage.getItem("highscores")) || [];

choicesEl.addEventListener("click", function (event) {
  var element = event.target;
  var question = questions[i];
  if (element.getAttribute("class") === "item") {
    console.log("make sure this is item");
    var id = parseInt(element.getAttribute("data-id"));
    if (question.answer === id) {
      console.log("CORRECT ANSWER");
      score++;
    } else {
      console.log("WRONG ANSWER");
      timeLeft = timeLeft - 5;
    }
    i++;
    console.log("SCORE", score);
    renderQuestionData();

  }
});


// console.log(questionsEl.choices, "This is questions element console log")
// functions that renders the question data
function renderQuestionData() {
  let question = questions[i]
  choicesEl.innerHTML = "";
  questionsEl.textContent = question.text;
  // console.log(questionsEl.choices, "This is questions element console log 2")
  question.choices.forEach(function (choice, index) {
    console.log(questionsEl.choices)
    var choicecontainer = document.createElement("div");
    var choiceItem = document.createElement("button");

    choiceItem.setAttribute("class", "item");
    choicecontainer.setAttribute("class", "choiceContainer");
    choiceItem.setAttribute("data-id", index);
    choiceItem.textContent = choice;
    choicesEl.appendChild(choicecontainer);
    choicecontainer.appendChild(choiceItem);
    if (i > questions.length) {
      console.log("END GAME");
      startEl.style.display = "none";
      questionsEl.style.display = "none";
      finishEl.style.display = "flex";
      highscoreEl.style.display = "none"
      clearInterval(interval);

    }

  });

}


//function that initializes timer
function initializeTimer() {
  timeLeft = parseInt(timerEl.getAttribute("data-time"));
  interval = setInterval(function () {
    timeLeft--;
    if (timeLeft > 0) {
      timerEl.textContent = timeLeft;
    } else {

      console.log("END GAME");
      startEl.style.display = "none";
      questionsEl.style.display = "none";
      finishEl.style.display = "flex";
      highscoreEl.style.display = "none"
      clearInterval(interval);

      var highScore = {
        initials: initials,
        score: 0,
      }
      highScores.push(highScore);
      localStorage.setItem('highScores', JSON.stringify(highScores));
      var showHighScore = JSON.parse(localStorage.getItem('highScores'));
    }
  }, 1000);
}

startBtn.addEventListener("click", function (event) {
  startEl.style.display = "none";
  questionsEl.style.display = "flex";
  finishEl.style.display = "none";


  renderQuestionData();
  initializeTimer();




});
highScoreBtn.addEventListener("click", function (event) {
  startEl.style.display = "none";
  questionsEl.style.display = "none";
  finishEl.style.display = "none";
  highscoreEl.style.display = "flex";
});

playAgainBtn.addEventListener("click", function (event) {
  startEl.style.display = "none";
  questionsEl.style.display = "flex";
  finishEl.style.display = "none";

  renderQuestionData();
  initializeTimer();
});

//added
