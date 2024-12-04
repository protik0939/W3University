const questions = [
    {
      question: "What is the purpose of the <iframe> element in HTML?",
      options: [
        "To embed another webpage within a webpage",
        "To include multimedia content",
        "To display images",
        "To create forms"
      ],
      correct: "To embed another webpage within a webpage",
    },
    {
      question: "Which attribute specifies the URL of the page to embed in an <iframe>?",
      options: ["src", "href", "link", "url"],
      correct: "src",
    },
    {
      question: "How do you set the width of an <iframe> in HTML?",
      options: [
        "Using the width attribute",
        "Using the size attribute",
        "Using the display attribute",
        "Using the length attribute"
      ],
      correct: "Using the width attribute",
    },
    {
      question: "Can an <iframe> be styled with CSS?",
      options: ["Yes", "No"],
      correct: "Yes",
    },
    {
      question: "Which attribute prevents an <iframe> from being resized by the user?",
      options: ["scrolling", "frameborder", "resizable", "sandbox"],
      correct: "scrolling",
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
