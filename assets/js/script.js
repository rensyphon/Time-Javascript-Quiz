const startBtn = document.getElementById("start");
const questionAnswerOptionsArea = document.getElementById("questionAnswerOptionsArea")
const timerEl = document.getElementById('countdown');
const quizArea = document.getElementById('quizArea');
const questionPromptArea = document.getElementById('questionPrompt');
const highScoreInputForm = document.getElementById('highScoreInputForm');
const highScoreArea = document.getElementById('highScore');

const questions = [
    {
        question: "CSS is primarily responsible for a website's _______?",
        options: ["skeleton", "functionality", "server", "aesthetics"],
        answer: "aesthetics",
    },
    {
        question: "Which of the following is a Javascript datatype?",
        options: ["int", "let", "var", "cd"],
        answer: 'int',
    },
    {
        question: "Which of the following is not a front-end language?",
        options: ["Javascript", "CSS", "MongoDB", "HTML"],
        answer: "MongoDB",
    },
    {
        question: "Which symbol is used to terminate a statement?",
        options: ["}", ".", ")", ";"],
        answer: ";",
    }
]

let correctAnswers = 0;
let timeLeft = 16;
let userPlace = 0;
const listOfHighScores = [];
let timeInterval;

function startCountdownTimer() {
    timeInterval = setInterval(function () {
        if (timeLeft >= 1) {
            timerEl.textContent = timeLeft;
            timeLeft--;
        } else {
            switchToHighScoreInputInterface();
        }
    }, 1000);
}

function startQuiz() {
    // hide the "start" button
    startBtn.style.display = "none";

    // show the countdown timer
    startCountdownTimer();

    // show the quiz question and the answer choices
    displayCurrentQuestion();
}

function displayCurrentQuestion() {
    questionPromptArea.textContent = questions[userPlace].question;
    questionAnswerOptionsArea.innerHTML = "";

    //create loop to create buttons for each answer option
    for (let i = 0; i < questions[userPlace].options.length; i++) {
        const btn = document.createElement("button");
        btn.id = "answerOptions";
        btn.textContent = questions[userPlace].options[i];
        // handle selecting an answer choice
        btn.onclick = selectAnswerChoice
        questionAnswerOptionsArea.append(btn);
    }
}

function goBackToQuiz() {
    // set the interface and variables back to the starting setup
    timeLeft = 16;
    userPlace = 0;
    correctAnswers = 0;

    highScoreArea.innerHTML = '';

    questionAnswerOptionsArea.innerHTML = '';
    questionPromptArea.textContent = '';
    timerEl.innerHTML = '';
    startBtn.style.display = 'block';

    // show the quiz area
    quizArea.style.display = "block";
}

function displayHighScores() {
    let highScoresMarkup = '<h1>High Scores:</h1><hr/>';

    listOfHighScores.forEach(highScoreData => {
        highScoresMarkup += `
                               <div><b>Score:&nbsp</b>${highScoreData.score}</div>
                               <div><b>Player Name:&nbsp</b> ${highScoreData.playerName}</div>
                               <hr/>
                            `;
    });

    highScoresMarkup += '<button id="goBackButton">Go Back</button>';

    highScoreInputForm.innerHTML = '';
    highScoreArea.innerHTML = highScoresMarkup;

    document.getElementById('goBackButton')
        .addEventListener('click', goBackToQuiz)
}

function handleSubmitHighScoreForm() {
    const highScorePlayerName = document.getElementById('highScoreNameInput').value;
    listOfHighScores.push({
        score: correctAnswers,
        playerName: highScorePlayerName
    });

    displayHighScores();
}

function switchToHighScoreInputInterface() {
    clearInterval(timeInterval);

    // hide the quiz area
    quizArea.style.display = "none";

    highScoreInputForm.innerHTML = `<div>
                                <h1>All Done</h1>
                                <div>You have a high score of ${correctAnswers}</div>
                                <label>Enter your name here:</label>
                                <input type="text" id="highScoreNameInput"/>
                                <button id="submitHighScoreFormButton">Submit</button>
                            </div>`;

    document.getElementById('submitHighScoreFormButton')
        .addEventListener('click', handleSubmitHighScoreForm)
}

function goToNextQuestion() {
    userPlace += 1;

    //create conditional checking to see if out of questions
    if (userPlace > questions.length - 1) {
        switchToHighScoreInputInterface();
    } else {
        displayCurrentQuestion();
    }
}

function selectAnswerChoice() {
    if (questions[userPlace].answer === this.textContent) {
        alert("Correct!");
        // increment correctAnswers;
        correctAnswers += 1;
        timeLeft += 2;
    } else {
        alert("Incorrect!")
        timeLeft = timeLeft - 2;
    }

    goToNextQuestion();
}

startBtn.addEventListener("click", startQuiz);
