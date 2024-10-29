// Define questions and correct answers
const questions = [
    { question: "What is Next.js?", answer: "A React framework" },
    { question: "How do you create a page in Next.js?", answer: "Create a file in pages folder" },
    { question: "What is getStaticProps used for?", answer: "For static generation" },
    { question: "Explain the purpose of getServerSideProps.", answer: "For server-side rendering" },
    { question: "How do you handle routing in Next.js?", answer: "Using pages folder" },
    { question: "What is dynamic routing in Next.js?", answer: "Routing based on URL params" },
    { question: "How to optimize images in Next.js?", answer: "Using next/image component" },
    { question: "Explain API routes in Next.js.", answer: "Create API endpoints in pages/api" },
    { question: "How do you deploy Next.js to Vercel?", answer: "Push to GitHub and link with Vercel" },
    { question: "What are serverless functions in Next.js?", answer: "Functions that run without managing servers" },
    { question: "What is pre-rendering in Next.js?", answer: "Rendering at build time" },
    { question: "What is the difference between static and dynamic pages?", answer: "Static is pre-rendered, dynamic updates on request" }
  ];
  
  let currentQuestion = 0;
  let score = 0;
  

// 2. Progress Bar 

function updateProgressBar() {
    const progress = (currentQuestion / questions.length) * 110;
    document.getElementById('progress').style.width = `${progress}%`;
  }
  
  function showQuestion() {
    document.getElementById('question').textContent = questions[currentQuestion].question;
    updateProgressBar();
    startTimer();
  }

let totalQuizTime = 360; // Total time for the quiz in seconds (6 minutes)
let remainingTime = totalQuizTime; // Remaining time, starts equal to total time
let totalTimeInterval; // For total quiz countdown

// Start the quiz and the countdown timer
function startQuiz() {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    
    if (name && email) {
      document.getElementById('login-section').classList.add('hidden');
      document.getElementById('quiz-section').classList.remove('hidden');
  
      // Show total quiz time and start countdown
      document.getElementById('total-time').textContent = formatTime(totalQuizTime);
      startTotalTimer();
  
      showQuestion();
    } else {
      alert("Please enter both name and email to start the quiz.");
    }
  }
  
  // Format seconds into mm:ss format
  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  }
  
  // Start the total quiz timer
  function startTotalTimer() {
    document.getElementById('remaining-time').textContent = formatTime(remainingTime);
  
    totalTimeInterval = setInterval(() => {
      remainingTime--;
      document.getElementById('remaining-time').textContent = formatTime(remainingTime);
  
      if (remainingTime <= 0) {
        clearInterval(totalTimeInterval);
        alert("Time's up!");
        displayResult(); // Auto-submit quiz if time runs out
      }
    }, 1000); // Countdown every second
  }
  
  // Timer for each question (30 seconds per question)
  let timeLimit = 30; // seconds
  let questionTimer;
  
  function startQuestionTimer() {
    let timeLeft = timeLimit;
    document.getElementById('timer').textContent = `Time Left: ${timeLeft}s`;
  
    questionTimer = setInterval(() => {
      timeLeft--;
      document.getElementById('timer').textContent = `Time Left: ${timeLeft}s (Auto Move to Next Question !)`;
  
      if (timeLeft <= 0) {
        clearInterval(questionTimer);
        submitAnswer(); // Auto-submit when time is up
      }
    }, 1000);
  }
  
  // Function to show the next question
  function showQuestion() {
    document.getElementById('question').textContent = questions[currentQuestion].question;
    startQuestionTimer();
    updateProgressBar();
  }
  
  // Submit answer and move to the next question
  function submitAnswer() {
    clearInterval(questionTimer); // Stop the question timer when answer is submitted
    
    const userAnswer = document.getElementById('answer').value.trim().toLowerCase();
    const correctAnswer = questions[currentQuestion].answer.toLowerCase();
    
    if (userAnswer === correctAnswer) {
      score += 2; // Award 2 points for correct answers
    }
    
    document.getElementById('answer').value = ""; // Clear input field
    currentQuestion++;
  
    if (currentQuestion < questions.length) {
      showQuestion();
    } else {
      clearInterval(totalTimeInterval); // Stop total quiz timer when quiz is over
      displayResult();
    }
  }

    function displayResult() {
    document.getElementById('quiz-section').classList.add('hidden');
    document.getElementById('result-section').classList.remove('hidden');
  
    let resultText;
    if (score < 20) {  // Assuming 20 is the pass mark
      resultText = "Aww! Better luck next time! Here's an answer sheet to help you prepare.";
      console.log("Final Result: Failed - Score below 20");
      // Show the "Show Answer Sheet" button
    document.getElementById('show-answer-sheet-btn').classList.remove('hidden');
    } else {
      resultText = "Congratulations!";
      console.log("Final Result: Passed - Score 20 or above");
    }
  
    document.getElementById('result-text').textContent = resultText;
    document.getElementById('score').textContent = `You scored ${score} out of 24.`;
  }

  function toggleAnswerSheet() {
    const answerSheetDiv = document.getElementById('answer-sheet');
    const isHidden = answerSheetDiv.classList.contains('hidden');
    
    if (isHidden) {
      displayAnswerSheet();  // Generate and show the answer sheet
      answerSheetDiv.classList.remove('hidden');
    } else {
      answerSheetDiv.classList.add('hidden');  // Hide the answer sheet if it's already visible
    }
  }

  function displayAnswerSheet() {
    let answerSheetHTML = '<h3>Answer Sheet</h3><ul>';
  
    // Loop through each question and display it along with the correct answer
    questions.forEach((questionObj, index) => {
      answerSheetHTML += `
        <li>
          <strong>Question ${index + 1}:</strong> ${questionObj.question}<br>
          <strong>Answer:</strong> ${questionObj.answer}
        </li><br>
      `;
    });
  
    answerSheetHTML += '</ul>';
    
    // Append the answer sheet to the result section
    document.getElementById('result-section').innerHTML += answerSheetHTML;
  }


  
