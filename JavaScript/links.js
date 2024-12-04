[
    {
      question: "Which HTML tag is used to define a hyperlink?",
      options: ["<a>", "<link>", "<href>", "<url>"],
      correct: "<a>",
    },
    {
      question: "What attribute is used to specify the destination URL in a hyperlink?",
      options: ["href", "src", "link", "url"],
      correct: "href",
    },
    {
      question: "How do you make a link open in a new tab in HTML?",
      options: [
        "Add the attribute target='_blank'",
        "Use the <newtab> tag",
        "Add the attribute target='new'",
        "Set the href attribute to '_newtab'"
      ],
      correct: "Add the attribute target='_blank'",
    },
    {
      question: "Which of the following is used to link to an external CSS file?",
      options: [
        "<link rel='stylesheet' href='style.css'>",
        "<a href='style.css'>",
        "<stylesheet href='style.css'>",
        "<style src='style.css'>"
      ],
      correct: "<link rel='stylesheet' href='style.css'>",
    },
    {
      question: "How do you create an email link in HTML?",
      options: [
        "<a href='mailto:example@example.com'>",
        "<a href='email:example@example.com'>",
        "<mail href='example@example.com'>",
        "<a href='mail:example@example.com'>"
      ],
      correct: "<a href='mailto:example@example.com'>",
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