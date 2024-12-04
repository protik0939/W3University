const questions =  [
    {
        question: "Which HTML tag is used to display an image?",
        options: ["<img>", "<image>", "<src>", "<picture>"],
        correct: "<img>",
      },
      {
        question: "What attribute is used to specify the source of an image in HTML?",
        options: ["src", "href", "source", "url"],
        correct: "src",
      },
      {
        question: "What attribute can be added to provide alternative text for an image?",
        options: ["alt", "text", "description", "title"],
        correct: "alt",
      },
      {
        question: "How do you specify the width of an image in HTML?",
        options: [
          "width='300px'",
          "width='300'",
          "<img width='300'>",
          "<img style='width: 300px;'>"
        ],
        correct: "width='300'",
      },
      {
        question: "How do you make an image responsive in HTML?",
        options: [
          "By using the width='100%' attribute",
          "By adding the class 'responsive' to the <img> tag",
          "By using the CSS property max-width: 100%",
          "By adding the attribute responsive='true'"
        ],
        correct: "By using the CSS property max-width: 100%",
      },
      {
        question: "Which HTML tag is used to create an image map?",
        options: ["<map>", "<imgmap>", "<area>", "<imagemap>"],
        correct: "<map>",
      },
      {
        question: "What is the purpose of the 'usemap' attribute in the <img> tag?",
        options: [
          "To define the image source",
          "To link the image to a map",
          "To make the image clickable",
          "To specify the image size"
        ],
        correct: "To link the image to a map",
      }
]




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

