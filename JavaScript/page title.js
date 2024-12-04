const questions =  [
    
        {
          question: "What is the purpose of the <title> tag in HTML?",
          options: [
            "To specify the title of the web page shown on the browser tab",
            "To define the main heading of the page",
            "To link external CSS stylesheets",
            "To create hyperlinks on the page"
          ],
          correct: "To specify the title of the web page shown on the browser tab",
        },
        {
          question: "Where is the <title> tag located in an HTML document?",
          options: [
            "Inside the <head> section",
            "Inside the <body> section",
            "At the very end of the HTML file",
            "Directly after the <!DOCTYPE> declaration"
          ],
          correct: "Inside the <head> section",
        },
        {
          question: "What is displayed in the browser when a title is not specified?",
          options: [
            "The browser displays a default name (e.g., 'Untitled')",
            "The browser displays an error message",
            "The web page does not load",
            "The first heading on the page is used as the title"
          ],
          correct: "The browser displays a default name (e.g., 'Untitled')",
        },
        {
          question: "Which of the following is the correct way to set a page title in HTML?",
          options: [
            "<title>My Web Page</title>",
            "<header>My Web Page</header>",
            "<meta title='My Web Page'>",
            "<h1>My Web Page</h1>"
          ],
          correct: "<title>My Web Page</title>",
        },
        {
          question: "Can the <title> tag contain special characters like '&' and '<'?",
          options: [
            "Yes, but they need to be escaped (e.g., &amp; or &lt;)",
            "Yes, without any restrictions",
            "No, it only allows plain text",
            "No, only alphanumeric characters are allowed"
          ],
          correct: "Yes, but they need to be escaped (e.g., &amp; or &lt;)",
        },
        {
          question: "What is the maximum length for a page title for SEO purposes?",
          options: [
            "Around 50–60 characters",
            "Unlimited length",
            "10–20 characters",
            "100–120 characters"
          ],
          correct: "Around 50–60 characters",
        },
        {
          question: "Which of the following describes the <title> tag's effect on search engines?",
          options: [
            "It improves the page's visibility in search engine results",
            "It hides the page from search engines",
            "It has no effect on search engines",
            "It sets the language of the web page"
          ],
          correct: "It improves the page's visibility in search engine results",
        },
        {
          question: "Can the <title> tag be styled using CSS?",
          options: [
            "No, because the <title> tag is not rendered on the page",
            "Yes, using the 'title' selector",
            "Yes, by including inline CSS",
            "No, but JavaScript can modify it"
          ],
          correct: "No, because the <title> tag is not rendered on the page",
        },
        {
          question: "Is the <title> tag mandatory in an HTML document?",
          options: [
            "Yes, for valid and accessible HTML",
            "No, it is optional",
            "Yes, but only in XHTML",
            "No, it is only required for SEO"
          ],
          correct: "Yes, for valid and accessible HTML",
        },
        {
          question: "What happens if there are multiple <title> tags in the <head> section?",
          options: [
            "The browser uses the content of the first <title> tag",
            "The browser merges all the <title> tags",
            "An error is displayed in the browser",
            "The page will not load"
          ],
          correct: "The browser uses the content of the first <title> tag",
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