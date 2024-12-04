const questions = [
    {
      question: "What is the purpose of the 'class' attribute in HTML?",
      options: [
        "To assign a unique identifier to an element",
        "To define a group of elements with similar styles",
        "To create hyperlinks",
        "To set the element's ID"
      ],
      correct: "To define a group of elements with similar styles",
    },
    {
      question: "How do you select an element with a specific class in CSS?",
      options: [
        "Using #classname",
        "Using .classname",
        "Using @classname",
        "Using classname without a symbol"
      ],
      correct: "Using .classname",
    },
    {
      question: "Can multiple elements share the same class in HTML?",
      options: ["Yes", "No"],
      correct: "Yes",
    },
    {
      question: "Which attribute is commonly used with 'class' for JavaScript functionality?",
      options: ["id", "onclick", "style", "type"],
      correct: "id",
    },
    {
      question: "How can you assign multiple classes to an element?",
      options: [
        "Separate them with commas",
        "Separate them with spaces",
        "Use multiple 'class' attributes",
        "It's not possible"
      ],
      correct: "Separate them with spaces",
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
