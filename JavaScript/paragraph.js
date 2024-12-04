const questions = [
    {
      question: "Which HTML tag is used to define a paragraph?",
      options: ["<p>", "<div>", "<span>", "<h1>"],
      correct: "<p>",
    },
    {
      question: "How can you add extra space between paragraphs in HTML?",
      options: [
        "Using the <br> tag",
        "Using the CSS margin property",
        "Using the <p> tag repeatedly",
        "Using the <h1> tag"
      ],
      correct: "Using the CSS margin property",
    },
    {
      question: "What is the default alignment of a paragraph in HTML?",
      options: [ "Center", "Right", "Left", "Justify"],
      correct: "Left",
    },
    {
      question: "Which of the following CSS property is used to style the line spacing of a paragraph?",
      options: ["line-height", "letter-spacing", "word-spacing", "text-align"],
      correct: "line-height",
    },
    {
      question: "How do you make the text in a paragraph italic in HTML?",
      options: ["<p style='italic'>", "<i>", "<italic>", "<em>"],
      correct: "<em>",
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
