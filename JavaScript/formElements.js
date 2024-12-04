
const questions = [
    {
        question: "Which HTML element is used to create a form?",
        options: ["<input>", "<button>", "<form>", "<fieldset>"],
        correct: "<form>",
      },
      {
        question: "Which element defines a clickable button inside a form?",
        options: ["<input>", "<label>", "<button>", "<submit>"],
        correct: "<button>",
      },
      {
        question: "Which element groups related form controls together?",
        options: ["<fieldset>", "<group>", "<section>", "<label>"],
        correct: "<fieldset>",
      },
      {
        question: "What is the purpose of the <label> element?",
        options: [
          "To define a form control",
          "To describe an input element",
          "To create a submit button",
          "To group input elements",
        ],
        correct: "To describe an input element",
      },
      {
        question: "Which element is used to provide a hint or description for a form field?",
        options: ["<legend>", "<label>", "<title>", "<placeholder>"],
        correct: "<label>",
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
    