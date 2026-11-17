import Quiz from "./quiz.js";
import Question from "./question.js";

const quizOptionsForm = document.getElementById("quizOptions");
const playerNameInput = document.getElementById("playerName");
const categoryInput = document.getElementById("categoryMenu");
const difficultyOptions = document.getElementById("difficultyOptions");
const questionsNumber = document.getElementById("questionsNumber");
const startQuizBtn = document.getElementById("startQuiz");
const questionsContainer = document.querySelector(".questions-container");
let currentQuiz = null;

function showLoading() {
  questionsContainer.innerHTML = `
    <div class="loading-overlay">
      <div class="loading-spinner"></div>
      <p class="loading-text">Loading Questions...</p>
    </div>
  `;
}

function showError(message) {
  questionsContainer.innerHTML = `
    <div class="game-card error-card">
      <div class="error-icon">
        <i class="fa-solid fa-triangle-exclamation"></i>
      </div>
      <h3 class="error-title">Oops! Something went wrong</h3>
      <p class="error-message">${message}</p>
      <button class="btn-play retry-btn">
        <i class="fa-solid fa-rotate-right"></i> Try Again
      </button>
    </div>
  `;

  const retryBtn = document.querySelector(".retry-btn");
  retryBtn.addEventListener("click", resetToStart);
}

function showFormError(message) {
  const errorDiv = document.createElement("div");
  errorDiv.classList.add("form-error");
  errorDiv.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> ${message}`;
  startQuizBtn.insertAdjacentElement("beforebegin", errorDiv);
  setTimeout(() => {
    errorDiv.classList.add("fade-out");
    setTimeout(() => {
      errorDiv.remove();
    }, 500);
  }, 3000);
}

function hideLoading() {
  const loadingOverlay = document.querySelector(".loading-overlay");
  if (loadingOverlay) {
    loadingOverlay.remove();
  }
}

function validateForm() {
  const value = questionsNumber.value;
  if (!value) {
    return { isValid: false, error: "Please enter number of questions." };
  }
  const numValue = +(value);
  if (numValue < 1) {
    return { isValid: false, error: "You need at least 1 question." };
  }
  if (numValue > 50) {
    return { isValid: false, error: "Maximum 50 questions allowed." };
  }
  return { isValid: true, error: null };
}

function resetToStart() {
  questionsContainer.innerHTML = "";
  quizOptionsForm.reset();
  questionsNumber.value=""
  quizOptionsForm.classList.remove("hidden");
  currentQuiz = null;
}
async function startQuiz() {
  const validation = validateForm();
  if (!validation.isValid) {
    showFormError(validation.error);
    return;
  }
  const playerName = playerNameInput.value || "Player";
  const category = categoryInput.value;
  const difficulty = difficultyOptions.value;
  const numberOfQuestions = questionsNumber.value;
  currentQuiz = new Quiz(category, difficulty, numberOfQuestions, playerName);
  quizOptionsForm.classList.add("hidden");
  showLoading();
  try {
    await currentQuiz.getQuestions();
    hideLoading();
    if (currentQuiz.questions.length === 0) {
      showError("No questions found. Please try different options.");
      return;
    }
    const firstQuestion = new Question(currentQuiz, questionsContainer, resetToStart);
    firstQuestion.displayQuestion();
  } catch (error) {
    hideLoading();
    showError("Something went wrong while fetching questions. Please try again.");
  }
}

startQuizBtn.addEventListener("click", startQuiz);

questionsNumber.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    startQuiz();
  }
});
