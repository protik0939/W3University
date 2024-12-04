const questions = [
    {
      question: "Which attribute is used to apply inline styles to an HTML element?",
      options: ["class", "id", "style", "css"],
      correct: "style",
    },
    {
      question: "What does the 'color' property in CSS control?",
      options: [
        "The background color of an element",
        "The text color of an element",
        "The border color of an element",
        "The font size of an element"
      ],
      correct: "The text color of an element",
    },
    {
      question: "Which property is used to change the background color of an HTML element?",
      options: ["background", "color", "bgcolor", "background-color"],
      correct: "background-color",
    },
    {
      question: "How do you change the font size of text in an element using inline styles?",
      options: [
        "style='font-size:20px;'", 
        "style='text-size:20px;'", 
        "style='font:20px;'", 
        "style='size:20px;'"
      ],
      correct: "style='font-size:20px;'",
    },
    {
      question: "Which CSS property is used to add space inside the border of an element?",
      options: ["margin", "padding", "border-spacing", "spacing"],
      correct: "padding",
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
