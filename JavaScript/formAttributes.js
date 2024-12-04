
const questions = [
    {
        question: "Which attribute specifies the URL to send form data to after submission?",
        options: ["method", "formaction", "target", "action"],
        correct: "action",
      },
      {
        question: "Which attribute specifies the HTTP method used when submitting the form?",
        options: ["method", "type", "action", "enctype"],
        correct: "method",
      },
      {
        question: "Which attribute is used to specify the target window or frame to display the form result?",
        options: ["action", "formtarget", "target", "method"],
        correct: "target",
      },
      {
        question: "What does the 'novalidate' attribute do?",
        options: [
          "Prevents form validation when submitting",
          "Requires all fields to be filled out",
          "Validates input data types",
          "Allows form submission without filling any field",
        ],
        correct: "Prevents form validation when submitting",
      },
      {
        question: "Which attribute specifies the encoding type used when submitting the form data?",
        options: ["method", "enctype", "type", "formtarget"],
        correct: "enctype",
      },
      {
        question: "Which attribute overrides the form's method attribute for a specific button?",
        options: ["formtarget", "formenctype", "formaction", "formmethod"],
        correct: "formmethod",
      },
      {
        question: "Which attribute prevents validation of input elements before form submission?",
        options: ["formnovalidate", "required", "novalidate", "validate"],
        correct: "formnovalidate",
      },
      {
        question: "What is the default value of the 'method' attribute in an HTML form?",
        options: ["GET", "POST", "PUT", "DELETE"],
        correct: "GET",
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
    