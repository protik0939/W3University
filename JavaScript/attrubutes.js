const questions = [
    {
      question: "Which attribute is used to provide an alternative text for an image?",
      options: ["alt", "src", "title", "href"],
      correct: "alt",
    },
    {
      question: "Which attribute specifies a unique identifier for an HTML element?",
      options: ["id", "class", "name", "key"],
      correct: "id",
    },
    {
      question: "Which attribute is used to open a hyperlink in a new tab or window?",
      options: ["target", "rel", "href", "src"],
      correct: "target",
    },
    {
      question: "What is the purpose of the 'placeholder' attribute in an input tag?",
      options: [
        "To provide default text in the input field",
        "To set the input value",
        "To change the input type",
        "To add a label to the field"
      ],
      correct: "To provide default text in the input field",
    },
    {
      question: "Which attribute is used to specify inline CSS styles for an element?",
      options: ["style", "class", "id", "css"],
      correct: "style",
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
  