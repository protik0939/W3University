const questions = [
    {
      question: "Which HTML element is used to define the main heading of a webpage?",
      options: ["<title>", "<h1>", "<head>", "<header>"],
      correct: "<h1>",
    },
    {
      question: "What is the purpose of the <footer> element in HTML?",
      options: [
        "To display the title of the page",
        "To define navigation links",
        "To provide footer content like copyright or links",
        "To include metadata"
      ],
      correct: "To provide footer content like copyright or links",
    },
    {
      question: "Which HTML element is used to create an ordered list?",
      options: ["<ul>", "<ol>", "<li>", "<list>"],
      correct: "<ol>",
    },
    {
      question: "What does the <nav> element represent in HTML?",
      options: [
        "A container for navigation links",
        "A section for advertisements",
        "A sidebar for additional content",
        "A placeholder for images"
      ],
      correct: "A container for navigation links",
    },
    {
      question: "Which HTML element is used to embed a video in a webpage?",
      options: ["<embed>", "<video>", "<iframe>", "<media>"],
      correct: "<video>",
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
  