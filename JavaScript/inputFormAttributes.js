
const questions = [
    {
        question: "Which attribute specifies the type of input control to display?",
        options: ["type", "name", "value", "required"],
        correct: "type",
      },
      {
        question: "Which attribute is used to define the name of the input field, which is used to identify form data when submitted?",
        options: ["name", "value", "placeholder", "readonly"],
        correct: "name",
      },
      {
        question: "Which attribute makes the input field non-interactive and prevents the user from editing it?",
        options: ["readonly", "disabled", "required", "maxlength"],
        correct: "readonly",
      },
      {
        question: "Which attribute is used to specify a short hint that describes the expected value of the input field?",
        options: ["placeholder", "required", "value", "maxlength"],
        correct: "placeholder",
      },
      {
        question: "Which attribute defines a regular expression that the input value must match to be considered valid?",
        options: ["pattern", "min", "step", "autocomplete"],
        correct: "pattern",
      },
      {
        question: "Which attribute specifies the maximum number of characters allowed in an input field?",
        options: ["maxlength", "size", "value", "step"],
        correct: "maxlength",
      }
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
    