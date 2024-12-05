const questions = [
    {
        question: "Which of the following is the correct syntax for writing a comment in HTML?",
        options: ["<!-- comment -->", "// comment", "/* comment */", "<comment> comment </comment>"],
        correct: "<!-- comment -->",
      },
      {
        question: "Can HTML comments be nested within each other?",
        options: ["Yes, they can be nested.", "No, HTML comments cannot be nested.", "It depends on the browser.", "HTML comments are not allowed."],
        correct: "No, HTML comments cannot be nested.",
      },
      {
        question: "What is the purpose of comments in HTML?",
        options: ["To add visible text to the page", "To temporarily hide parts of the code", "To define the structure of the page", "To include external files"],
        correct: "To temporarily hide parts of the code",
      },
      {
        question: "Which of the following is NOT a valid use of comments in HTML?",
        options: ["To explain code to other developers", "To disable code from being executed", "To style HTML elements", "To document sections of the code"],
        correct: "To style HTML elements",
      },
      {
        question: "Can HTML comments be used to hide JavaScript code from the browser?",
        options: ["Yes, comments can hide JavaScript code", "No, comments do not hide JavaScript", "It depends on the type of script", "Only CSS code can be hidden using comments"],
        correct: "Yes, comments can hide JavaScript code",
      },
      {
        question: "How can you write a comment to describe a section of code in HTML?",
        options: ["<!-- This is a section of code -->", "// This is a section of code", "/* This is a section of code */", "<comment> This is a section of code </comment>"],
        correct: "<!-- This is a section of code -->",
      },
      {
        question: "Which of the following statements is true about HTML comments?",
        options: ["HTML comments are visible to the user on the webpage.", "HTML comments are not visible to the user but can be seen in the page source.", "HTML comments are automatically removed by the browser.", "HTML comments are used for encryption."],
        correct: "HTML comments are not visible to the user but can be seen in the page source.",
      },
      {
        question: "What will happen if you forget to close an HTML comment properly?",
        options: ["The comment will be displayed as text on the page", "The browser will ignore the entire HTML document", "The comment will continue to the next lines in the code", "There will be no effect on the code"],
        correct: "The comment will continue to the next lines in the code",
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
  const confettiColors = ['#EF2964', '#00C09D', '#2D87B0', '#48485E', '#EFFF1D', '#04aa6d'];
  const confettiAnimations = ['slow', 'medium', 'fast'];

  for (let i = 0; i < 40; i++) {
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


  