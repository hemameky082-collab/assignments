export default class Question {
  
  constructor(quiz, container, onQuizEnd) {
    this.quiz = quiz;
    this.container = container;
    this.onQuizEnd = onQuizEnd;
    this.questionData = quiz.getCurrentQuestion();
    this.index = quiz.currentQuestionIndex;
    this.question = this.decodeHtml(this.questionData.question);
    this.correctAnswer = this.decodeHtml(this.questionData.correct_answer);
    this.category = this.decodeHtml(this.questionData.category);
    this.wrongAnswers = this.questionData.incorrect_answers.map(answer =>
    this.decodeHtml(answer)
    );
    this.allAnswers = this.shuffleAnswers();
    this.answered = false;
    this.timerInterval = null;
    this.timeRemaining = 15;
    this.handleKeydown = this.handleKeydown.bind(this);
}

  decodeHtml(html) {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.documentElement.textContent;
  }

  shuffleAnswers() {
    const answers = [...this.wrongAnswers, this.correctAnswer];
    for (let i = answers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [answers[i], answers[j]] = [answers[j], answers[i]];
    }
    return answers;
  }

  getProgress() {
    return Math.round(((this.index + 1) / this.quiz.numberOfQuestions) * 100);
  }

displayQuestion() {
  const box = `
    <div class="game-card question-card">
      <div class="xp-bar-container">
        <div class="xp-bar-header">
          <span class="xp-label"><i class="fa-solid fa-bolt"></i> Progress</span>
          <span class="xp-value">Question ${this.index + 1}/${this.quiz.numberOfQuestions}</span>
        </div>
        <div class="xp-bar">
          <div class="xp-bar-fill" style="width: ${this.getProgress()}%"></div>
        </div>
      </div>
      <div class="stats-row">
        <div class="stat-badge category">
          <i class="fa-solid fa-bookmark"></i>
          <span>${this.category}</span>
        </div>
        <div class="stat-badge difficulty ${this.quiz.difficulty}">
          <i class="fa-solid fa-face-smile"></i>
          <span>${this.quiz.difficulty}</span>
        </div>
        <div class="stat-badge timer">
          <i class="fa-solid fa-stopwatch"></i>
          <span class="timer-value">${this.timeRemaining}</span>s
        </div>
        <div class="stat-badge counter">
          <i class="fa-solid fa-gamepad"></i>
          <span>${this.index + 1}/${this.quiz.numberOfQuestions}</span>
        </div>
      </div>
      <h2 class="question-text">${this.question}</h2>
      <div class="answers-grid">
        ${this.allAnswers.map((answer, i) => `
          <button class="answer-btn" data-answer="${answer}">
            <span class="answer-key">${i + 1}</span>
            <span class="answer-text">${answer}</span>
          </button>
        `).join("")}
      </div>
      <p class="keyboard-hint">
        <i class="fa-regular fa-keyboard"></i> Press 1-${this.allAnswers.length} to select
      </p>
      <div class="score-panel">
        <div class="score-item">
          <div class="score-item-label">Score</div>
          <div class="score-item-value">${this.quiz.score}</div>
        </div>
      </div>
    </div>
  `;

  this.container.innerHTML = box;
  this.addEventListeners();
  this.startTimer();
}

  addEventListeners() {
    const buttons = document.querySelectorAll(".answer-btn");
    buttons.forEach(button => {
      button.addEventListener("click", () => this.checkAnswer(button));
    });
    document.addEventListener("keydown", this.handleKeydown);
  }

  handleKeydown(e) {
    const validKeys = ["1", "2", "3", "4"];
    if (validKeys.includes(e.key)) {
      const index = parseInt(e.key) - 1;
      const buttons = document.querySelectorAll(".answer-btn");
      if (buttons[index]) {
        this.checkAnswer(buttons[index]);
      }
    }
  }

  removeEventListeners() {
    document.removeEventListener("keydown", this.handleKeydown);
  }

startTimer() {
  const timerValue = document.querySelector('.timer-value');
  const timerBadge = document.querySelector('.stat-badge.timer');

  this.timerInterval = setInterval(() => {
    this.timeRemaining--;

    if (timerValue) {
      timerValue.textContent = this.timeRemaining;
    }

    if (this.timeRemaining <= 5 && timerBadge) {
      timerBadge.classList.add('warning');
    }

    if (this.timeRemaining <= 5 && this.timeRemaining > 0) {
      this.playTone(1000, 0.1);   
    }

    if (this.timeRemaining <= 0) {
      this.stopTimer();
      this.handleTimeUp();
    }
  }, 1000);
}

  stopTimer() {
    clearInterval(this.timerInterval);
  }

handleTimeUp() {
  this.answered = true;
  this.removeEventListeners();

  const buttons = document.querySelectorAll('.answer-btn');
  buttons.forEach(button => {
    if (button.dataset.answer.toLowerCase() === this.correctAnswer.toLowerCase()) {
      button.classList.add('correct');
    }
  });

  this.playTone(500, 0.1);
    setTimeout(() => this.playTone(650, 0.1), 100);
    setTimeout(() => this.playTone(750, 0.1), 200); 

  const questionCard = document.querySelector('.question-card');
  if (questionCard) {
    questionCard.insertAdjacentHTML('beforeend', `
      <div class="time-up-message">
        <i class="fa-solid fa-clock"></i> TIME'S UP!
      </div>
    `);

  }

  this.animateQuestion(1500);
}

checkAnswer(choiceElement) {
  if (this.answered) return;

  this.answered = true;
  this.stopTimer();
  this.removeEventListeners();

  const selectedAnswer = choiceElement.dataset.answer;
  const isCorrect = selectedAnswer.toLowerCase() === this.correctAnswer.toLowerCase();

 if (isCorrect) {
    choiceElement.classList.add('correct');
    this.quiz.incrementScore();
    this.playTone(500, 0.1); 
    setTimeout(() => this.playTone(650, 0.1), 100); 
    setTimeout(() => this.playTone(750, 0.1), 200);      
  } else {
    choiceElement.classList.add('wrong');
    this.highlightCorrectAnswer();
    this.playTone(300, 0.3);      
  }
  this.animateQuestion(500);
}

  highlightCorrectAnswer() {
    const buttons = document.querySelectorAll(".answer-btn");
    buttons.forEach(button => {
      if (button.dataset.answer.toLowerCase() === this.correctAnswer.toLowerCase()) {
        button.classList.add("correct-reveal");
      }
    });
  }

getNextQuestion() {
  const hasMore = this.quiz.nextQuestion();
  if (hasMore) {
    const nextQuestion = new Question(this.quiz, this.container, this.onQuizEnd);
    nextQuestion.displayQuestion();
  } else {
    const resultsHtml = this.quiz.endQuiz();
    this.container.innerHTML = resultsHtml;
     const notes = [550, 650, 800, 1020]; 
    notes.forEach((freq, i) => {
      setTimeout(() => this.playTone(freq, 0.2), i * 150);
    });
    const playAgainBtn = document.querySelector(".btn-restart");
    if (playAgainBtn) {
      playAgainBtn.addEventListener("click", () => {
        if (this.onQuizEnd) {
          this.onQuizEnd();
        }
      });
    }
  }
}

  animateQuestion(duration) {
    const questionCard = document.querySelector(".question-card");
    setTimeout(() => {
      if (questionCard) {
        questionCard.classList.add("exit");
      }
      setTimeout(() => {
        this.getNextQuestion();
      }, duration);
    }, 1000);
  }

  playTone(frequency, duration) {
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);

  oscillator.frequency.value = frequency;
  oscillator.type = 'sine';

  gainNode.gain.setValueAtTime(0.3, audioCtx.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + duration);

  oscillator.start();
  oscillator.stop(audioCtx.currentTime + duration);
}
}
