
const questions = [
    {
        question: "Which input type is used to create a single-line text field?",
        options: ["<input type='text'>", "<input type='password'>", "<input type='email'>", "<input type='tel'>"],
        correct: "<input type='text'>",
      },
      {
        question: "Which input type is used for a password field?",
        options: ["<input type='text'>", "<input type='password'>", "<input type='email'>", "<input type='number'>"],
        correct: "<input type='password'>",
      },
      {
        question: "Which input type is used for entering an email address?",
        options: ["<input type='text'>", "<input type='email'>", "<input type='date'>", "<input type='url'>"],
        correct: "<input type='email'>",
      },
      {
        question: "Which input type is used to create a date picker?",
        options: ["<input type='date'>", "<input type='datetime-local'>", "<input type='month'>", "<input type='week'>"],
        correct: "<input type='date'>",
      },
      {
        question: "Which input type is used to allow the user to select a number?",
        options: ["<input type='number'>", "<input type='range'>", "<input type='text'>", "<input type='date'>"],
        correct: "<input type='number'>",
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


function triggerRedFade() {
  const fade = document.createElement('div');
  fade.classList.add('red-fade');
  document.body.appendChild(fade);
  setTimeout(() => fade.remove(), 2000);
}


function triggerConfetti() {
  const container = document.querySelector('.js-confetti');
  const confettiColors = ['#EF2964', '#00C09D', '#2D87B0', '#48485E', '#EFFF1D'];
  const confettiAnimations = ['slow', 'medium', 'fast'];

  for (let i = 0; i < 100; i++) {
    const confetti = document.createElement('div');
    const size = Math.random() * 8 + 5 + 'px';
    const color = confettiColors[Math.floor(Math.random() * confettiColors.length)];
    const left = Math.random() * window.innerWidth + 'px';
    const top = Math.random() * -100 + 'px';
    const animation = `confetti--animation-${confettiAnimations[Math.floor(Math.random() * confettiAnimations.length)]}`;
    confetti.classList.add('confetti', animation);
    confetti.style.width = size;
    confetti.style.height = size;
    confetti.style.backgroundColor = color;
    confetti.style.left = left;
    confetti.style.top = top;

    container.appendChild(confetti);

    // Remove confetti after animation
    setTimeout(() => {
      confetti.remove();
    }, 2000);
  }
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
    triggerConfetti();
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
    triggerRedFade();
    feedback.textContent = "Incorrect. Please try again.";
    feedback.classList.remove("correct");
    feedback.classList.add("incorrect");
  }
}

// Load the first question
loadQuestion();

// Event listener for the submit button
submitBtn.addEventListener("click", checkAnswer);


    