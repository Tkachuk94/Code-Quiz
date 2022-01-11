var Start = document.querySelector("#start-button")
var timerEl = document.querySelector("#timer-text")
var questions = document.querySelector("#questions")
var h1El = document.querySelector("h1")
var subtitle = document.querySelector("#subtitle")
var check = document.querySelector("#check")
var gameOverEl = document.querySelector("#game-over")
var initials = document.querySelector("#initials")
var finalScore = document.querySelector("#final-score")
var submit = document.querySelector("#submit")
var scores = document.querySelector("#scores")
var scoreList = document.querySelector("#score-list")

//database of questions and answers
var questionList = [
    {
        question: "Inside Which HTML Element Do we put the Javascript link?", 
        answers: [{text: "script", correct: true}, 
        {text: "js", correct: false}, 
        {text: "scripting", correct: false}, 
        {text: "javascript", correct: false}]
    },
    {
        question: "How do you call a funciton named myFunction?", 
        answers: [{text: "call myFunction()", correct: false}, 
        {text: "myFunction()", correct: true}, 
        {text: "call function myFunction()", correct: false}, 
        {text: "var myFunction()", correct: false}]
    },
    {
        question: "How can you add a single line comment in Javascript?", 
        answers: [{text: "/*This is a comment*/", correct: false}, 
        {text: "<!--This is a comment-->", correct: false}, 
        {text: "((This is a comment))", correct: false}, 
        {text: "//This is a comment", correct: true}]
    },
    {
        question: "How do you round the number 5.25, to the nearest integer?", 
        answers: [{text: "rnd(5.25)", correct: false}, 
        {text: "Math.round(5.25)", correct: true}, 
        {text: "Math.rnd(5.25)", correct: false}, 
        {text: "round(5.25)", correct: false}]
    },
    {
        question: "Which Event Occurs when the user clicks on an HTML element?", 
        answers: [{text: "onmouseClick", correct: false}, 
        {text: "hover", correct: false}, 
        {text: "onchange", correct: false}, 
        {text: "onclick", correct: true}]
    }
]

//start button starts the timer and starts displaying questions
Start.addEventListener("click", function(event) {
    startTimer()
    getQuestions()
    Start.classList.add("hide")
    h1El.classList.add("hide")
    subtitle.classList.add("hide")
    questions.removeAttribute('class')
})

//Timer
var timeLeft = 60
function startTimer() {  
    
    timer = setInterval(function() {
        timeLeft--
        timerEl.textContent = timeLeft 
        if (timeLeft<=0) {
            gameOver()
        }
    },1000)
}

//ends the game once it has gone through all the questions
var display = 0
function nextQuestion() { 
    if (display === questionList.length) {
        questions.style.display = "none"
        check.style.display = "none"
        gameOver() 
    }
    else {
        getQuestions()
    }  
}

//displays the current question and its answers
function getQuestions(){
    questions.innerHTML = ""
    var currentQuestion = questionList[display].question
    var h2El = document.createElement("h2")
    questions.appendChild(h2El)
    questions.children[0].textContent = currentQuestion
    var currentAnswers = questionList[display].answers
    currentAnswers.forEach(makeButtons)
    function makeButtons (event) {
        answerBtn = document.createElement("button")
        answerBtn.innerText = event.text
        h2El.appendChild(answerBtn)
        answerBtn.addEventListener("click", function() {
            //checks whether the user's choice is correct and then moves on to the next question
            if (event.correct === true) {
                check.textContent = "Correct!"
                check.style.color= "Green"
            }
            else {
                timeLeft = timeLeft - 10
                check.textContent = "Incorrect!"
                check.style.color = "red"
                timerEl.textContent = timeLeft
            }
            display++
            nextQuestion()
        })
    }
}

//hides questions and answers and displays endgame info
function gameOver () {
    //resets timeLeft score to 0 if it was negative
    if (timeLeft < 0) {
        timeLeft = 0
        timerEl.textContent = timeLeft
    }
    questions.style.display = "none"
    check.style.display = "none"
    gameOverEl.removeAttribute('class')
    clearInterval(timer)
    finalScore.textContent = timeLeft
}

submit.addEventListener('click', function (event) {
    submit.classList.add("hide")
    scores.classList.remove("hide")
    var initials = document.querySelector('#initials').value.trim()
    if (initials === "") {
        return;
    }
    var playerData = {
        playerName: initials, 
        timeLeft: timeLeft
    }
    localStorage.setItem("playerData", JSON.stringify(playerData))
    var fetch = JSON.parse(localStorage.getItem("playerData"))
    scoreList.append(fetch.playerName, " - ", fetch.timeLeft)
})

