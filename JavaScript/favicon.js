const questions =  [
    {
        question: "What is a favicon in HTML?",
        options: [
          "An icon displayed in the browser tab or bookmarks",
          "An image used as a website logo",
          "A tool for formatting HTML documents",
          "A placeholder for JavaScript code"
        ],
        correct: "An icon displayed in the browser tab or bookmarks",
      },
      {
        question: "Which HTML tag is used to define a favicon?",
        options: ["<link>", "<icon>", "<favicon>", "<meta>"],
        correct: "<link>",
      },
      {
        question: "What is the correct `rel` attribute value for a favicon?",
        options: ["icon", "stylesheet", "favicon", "shortcut icon"],
        correct: "shortcut icon",
      },
      {
        question: "What file format is commonly used for favicons?",
        options: [".ico", ".png", ".jpg", ".svg"],
        correct: ".ico",
      },
      {
        question: "What is the correct way to link a favicon to an HTML file?",
        options: [
          "<link rel='shortcut icon' href='favicon.ico'>",
          "<link rel='icon' src='favicon.ico'>",
          "<meta rel='icon' href='favicon.ico'>",
          "<img rel='shortcut icon' href='favicon.ico'>"
        ],
        correct: "<link rel='shortcut icon' href='favicon.ico'>",
      },
      {
        question: "Where should the <link> tag for the favicon be placed in an HTML file?",
        options: [
          "Inside the <head> section",
          "Inside the <body> section",
          "At the end of the HTML file",
          "Before the <html> tag"
        ],
        correct: "Inside the <head> section",
      },
      {
        question: "How do you specify a 16x16 pixel favicon in HTML?",
        options: [
          "<link rel='icon' href='favicon.ico' type='image/x-icon'>",
          "<link rel='icon' href='favicon.png' type='image/png'>",
          "<link rel='icon' href='favicon.ico' size='16x16'>",
          "<link rel='icon' href='favicon.ico'>"
        ],
        correct: "<link rel='icon' href='favicon.ico' type='image/x-icon'>",
      },
      {
        question: "What happens if a favicon is not provided for a website?",
        options: [
          "The browser will display a default icon or none at all",
          "The website won't load in the browser",
          "The website won't appear in search results",
          "An error message will be displayed"
        ],
        correct: "The browser will display a default icon or none at all",
      },
      {
        question: "Can you use a .png file as a favicon?",
        options: [
          "Yes, by specifying the correct `type` attribute",
          "No, only .ico files are allowed",
          "Yes, but only for mobile browsers",
          "No, .png is not supported for favicons"
        ],
        correct: "Yes, by specifying the correct `type` attribute",
      },
      {
        question: "What is the purpose of using multiple sizes for a favicon?",
        options: [
          "To ensure compatibility with different devices and resolutions",
          "To improve website performance",
          "To allow the favicon to animate",
          "To prevent browsers from caching the favicon"
        ],
        correct: "To ensure compatibility with different devices and resolutions",
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
