const questions = [
    {
      question: "What is the purpose of the <div> element in HTML?",
      options: [
        "To create a division or section in a document",
        "To define headings",
        "To add styles directly",
        "To include multimedia"
      ],
      correct: "To create a division or section in a document",
    },
    {
      question: "Is the <div> element a block-level element?",
      options: ["Yes", "No"],
      correct: "Yes",
    },
    {
      question: "Can you nest <div> elements within each other?",
      options: ["Yes", "No"],
      correct: "Yes",
    },
    {
      question: "Which attribute is commonly used with <div> for styling?",
      options: ["class", "href", "src", "alt"],
      correct: "class",
    },
    {
      question: "How can you make a <div> element act like an inline element?",
      options: [
        "Set display: inline;",
        "Set position: absolute;",
        "Set float: left;",
        "Set visibility: hidden;"
      ],
      correct: "Set display: inline;",
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
