const questions = [
    {
      question: "What is the purpose of the 'id' attribute in HTML?",
      options: [
        "To assign a unique identifier to an element",
        "To group multiple elements",
        "To apply inline styles",
        "To create hyperlinks"
      ],
      correct: "To assign a unique identifier to an element",
    },
    {
      question: "How do you select an element with a specific ID in CSS?",
      options: [
        "Using #idname",
        "Using .idname",
        "Using @idname",
        "Using idname without a symbol"
      ],
      correct: "Using #idname",
    },
    {
      question: "Can multiple elements have the same ID in HTML?",
      options: ["Yes", "No"],
      correct: "No",
    },
    {
      question: "Which is true about the 'id' attribute?",
      options: [
        "It must be unique within the document",
        "It can be used multiple times in a document",
        "It is only used for styling",
        "It cannot be used with JavaScript"
      ],
      correct: "It must be unique within the document",
    },
    {
      question: "Which is better for reusing styles across multiple elements?",
      options: ["id", "class"],
      correct: "class",
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
