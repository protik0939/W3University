
// Questions and answers array
const questions = [
    {
      question: "Which of the following headers is the largest and most important header?",
      options: ["<h1>", "<h2>", "<h3>", "<h4>", "<h5>", "<h6>"], // Use unescaped values here
      correct: "<h1>",
    },
    {
      question: "Which HTML tag is used to create a hyperlink?",
      options: ["<link>", "<href>", "<url>", "<a>"], // Use unescaped values here
      correct: "<a>",
    },
    {
      question: "Which of the following HTML Elements is used for making any text bold?",
      options: ["<p>", "<i>", "<li>", "<b>"],
      correct: "<b>",
    },
    {
      question: "What is the font-size of the h1 heading tag?",
      options: ["3.5em", "2.17em", "2em", "1.5em"],
      correct: "2em",
    },
  ];
  
  // Variables to track progress
  let currentQuestionIndex = 0;
  
  // References to HTML elements
  const quizContent = document.getElementById("quiz-content");
  const submitBtn = document.getElementById("submit-btn");
  const feedback = document.getElementById("feedback");
  
  // Function to load a question
  function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    quizContent.innerHTML = `
      <p class="question">${currentQuestion.question}</p>
      <div class="options">
        ${currentQuestion.options
          .map(
            (option) =>
              `<label>
                <input type="radio" name="answer" value="${option}">
                ${escapeHTML(option)}
              </label>`
          )
          .join("")}
      </div>
    `;
    feedback.textContent = ""; // Clear feedback
  }
  
  // Function to escape HTML entities for display
  function escapeHTML(str) {
    return str
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }
  
  // Function to check the answer
  function checkAnswer() {
    const selectedOption = document.querySelector('input[name="answer"]:checked');
    if (!selectedOption) {
      feedback.textContent = "Please select an answer.";
      return;
    }
  
    const answer = selectedOption.value.trim(); // Selected option value
    const correctAnswer = questions[currentQuestionIndex].correct.trim(); // Correct answer value
  
    if (answer === correctAnswer) {
      feedback.textContent = "Correct!";
      feedback.classList.remove("incorrect");
      feedback.classList.add("correct");
  
      // Move to the next question
      currentQuestionIndex++;
      if (currentQuestionIndex < questions.length) {
        setTimeout(() => {
          loadQuestion();
        }, 1000); // Delay for feedback
      } else {
        quizContent.innerHTML = `<h2>Congratulations! You've completed the quiz.</h2>`;
        submitBtn.style.display = "none"; // Hide the submit button after the last question
      }
    } else {
      feedback.textContent = "Incorrect. Please try again.";
      feedback.classList.remove("correct");
      feedback.classList.add("incorrect");
    }
  }
  
  // Load the first question
  loadQuestion();
  
  // Event listener for the submit button
  submitBtn.addEventListener("click", checkAnswer);
  