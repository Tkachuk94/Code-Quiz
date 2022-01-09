(function(){
    // Functions
    function buildQuiz(){
      // variable to store the HTML output
      const output = [];
  
      // for each question...
      myQuestions.forEach(
        (currentQuestion, questionNumber) => {
  
          // variable to store the list of possible answers
          const answers = [];
  
          // and for each available answer...
          for(letter in currentQuestion.answers){
  
            // ...add an HTML radio button
            answers.push(
              `<label>
                <input type="radio" name="question${questionNumber}" value="${letter}">
                ${letter} :
                ${currentQuestion.answers[letter]}
              </label>`
            );
          }
  
          // add this question and its answers to the output
          output.push(
            `<div class="slide">
              <div class="question"> ${currentQuestion.question} </div>
              <div class="answers"> ${answers.join("")} </div>
            </div>`
          );
        }
      );
  
      // finally combine our output list into one string of HTML and put it on the page
      quizContainer.innerHTML = output.join('');
    }
  
    function showResults(){
  
      // gather answer containers from our quiz
      const answerContainers = quizContainer.querySelectorAll('.answers');
  
      // keep track of user's answers
      let numCorrect = 0;
  
      // for each question...
      myQuestions.forEach( (currentQuestion, questionNumber) => {
  
        // find selected answer
        const answerContainer = answerContainers[questionNumber];
        const selector = `input[name=question${questionNumber}]:checked`;
        const userAnswer = (answerContainer.querySelector(selector) || {}).value;
  
        // if answer is correct
        if(userAnswer === currentQuestion.correctAnswer){
          // add to the number of correct answers
          numCorrect++;
  
          // color the answers green
          answerContainers[questionNumber].style.color = 'lightgreen';
        }
        // if answer is wrong or blank
        else{
          // color the answers red
          answerContainers[questionNumber].style.color = 'red';
        }
      });
  
      // show number of correct answers out of total
      resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
    }
  
    function showSlide(n) {
      slides[currentSlide].classList.remove('active-slide');
      slides[n].classList.add('active-slide');
      currentSlide = n;
      if(currentSlide === 0){
        previousButton.style.display = 'none';
      }
      else{
        previousButton.style.display = 'inline-block';
      }
      if(currentSlide === slides.length-1){
        nextButton.style.display = 'none';
        submitButton.style.display = 'inline-block';
      }
      else{
        nextButton.style.display = 'inline-block';
        submitButton.style.display = 'none';
      }
    }
  
    function showNextSlide() {
      showSlide(currentSlide + 1);
    }
  
    function showPreviousSlide() {
      showSlide(currentSlide - 1);
    }
  
    // Variables
    const quizContainer = document.getElementById('quiz');
    const resultsContainer = document.getElementById('results');
    const submitButton = document.getElementById('submit');
    const myQuestions = [
      {
        question: "Inside which HTML element do we put the Javascript?",
        answers: {
          a: "script",
          b: "js",
          c: "scripting",
          d: "javascript"
        },
        correctAnswer: "a"
      },
      {
        question: "How do you call a function named myFunction",
        answers: {
          a: "myFunction()",
          b: "call myFunction()",
          c: "call function myFunction()"
        },
        correctAnswer: "a"
      },
      {
        question: "How can you add a single line comment in Javascript?",
        answers: {
          a: "//This is a comment",
          b: " ** This is a comment **",
          c: "/*This is a comment*/",
          d: "((This is a comment))"
        },
        correctAnswer: "a"
      },
      {
        question: "How do you round the number 5.25, to the nearest integer",
        answers: {
          a: "rnd(5.25)",
          b: "round(5.25)",
          c: "Math.rnd(5.25)",
          d: "Math.round(5.25)"
        },
        correctAnswer: "d"
      },
      {
        question: "Which event occurs when the user clicks on an HTML element?",
        answers: {
          a: "onchange",
          b: "onclick",
          c: "hover",
          d: "onmouseclick"
        },
        correctAnswer: "b"
      },
      

    ];
  
    // Start quiz
    buildQuiz();
  
    // Pagination
    const previousButton = document.getElementById("previous");
    const nextButton = document.getElementById("next");
    const slides = document.querySelectorAll(".slide");
    let currentSlide = 0;
  
    // Show the first slide
    showSlide(currentSlide);
  
    // Event listeners
    submitButton.addEventListener('click', showResults);
    previousButton.addEventListener("click", showPreviousSlide);
    nextButton.addEventListener("click", showNextSlide);
  })();

  var timeLeft = 60; // In seconds
var timerId = setInterval(countdown, 1000);

function countdown() {
     timeLeft--;
   /// Shows Time Remaining to answer Questions
   document.getElementById("timer").innerHTML = timeLeft;
    if (timeLeft < 1) {
        document.getElementById("timer").innerHTML = 'Time has Run out!';
    
}

timeLeft = timeLeft
//then you need to ask if the timeLeft is less than 1 and finish
 if (timeLeft < 1) {
        clearTimeout(timerId);
        // doSomething();  /// here you call to showResult 
 }
}





    
