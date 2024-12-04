const questions = [
    {
      question: "Which HTML element is used to create an unordered list?",
      options: ["<ul>", "<ol>", "<li>", "<list>"],
      correct: "<ul>",
    },
    {
      question: "What does the <li> element represent in an HTML list?",
      options: [
        "A list item",
        "A list heading",
        "A nested list",
        "A link in a list"
      ],
      correct: "A list item",
    },
    {
      question: "Which attribute can be used to change the numbering style in an ordered list?",
      options: ["type", "style", "class", "id"],
      correct: "type",
    },
    {
      question: "Can lists be nested inside other lists in HTML?",
      options: ["Yes", "No"],
      correct: "Yes",
    },
    {
      question: "Which attribute in <ul> removes the bullets from the list items?",
      options: ["type='none'", "style='list-style:none;'", "class='no-bullets'", "bullet='none'"],
      correct: "style='list-style:none;'",
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
