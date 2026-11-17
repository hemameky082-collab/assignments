export default class Quiz {

   constructor(category, difficulty, numberOfQuestions, playerName){
    this.category=category
    this.difficulty=difficulty
    this.numberOfQuestions=numberOfQuestions
    this.playerName=playerName||"Player"
    this.score=0
    this.currentQuestionIndex=0
    this.questions=[]
  }
  
async getQuestions(){
  const response = await fetch(this.buildApiUrl())
  if (!response.ok) {
    throw new Error("Failed to fetch questions from the server.")
  }
  const data = await response.json()
  if (data.response_code !== 0) {
    throw new Error("No questions available for these settings.")
  }
  this.questions = data.results
  return this.questions
}

  buildApiUrl() {
  const params = new URLSearchParams({
    amount: this.numberOfQuestions,
    difficulty: this.difficulty,
  });

  if (this.category) {
    params.append("category", this.category);
  }

  return `https://opentdb.com/api.php?${params.toString()}`;
}
  incrementScore(){
    this.score+=1
  }

  getCurrentQuestion(){
      return this.questions[this.currentQuestionIndex] || null
  }

  nextQuestion(){
    this.currentQuestionIndex+=1
    if(this.currentQuestionIndex < this.questions.length){
      return true
    }else{
      return false
    }
  }

  isComplete(){
    if(this.currentQuestionIndex >= this.questions.length){
      return true
    }
    return false
  }

  getScorePercentage(){
    const percentage=Math.round((this.score / this.numberOfQuestions) * 100)
    return percentage
  }
  
saveHighScore() {
  const existingScores = this.getHighScores();
  const newScore = {
    name: this.playerName,
    score: this.score,
    total: this.numberOfQuestions,
    percentage: this.getScorePercentage(),
    difficulty: this.difficulty,
    date: new Date().toLocaleDateString()
  }
  existingScores.push(newScore)
  existingScores.sort((a, b) => b.percentage - a.percentage)
  const topScores = existingScores.slice(0, 10)
  localStorage.setItem("quizHighScores", JSON.stringify(topScores))
}
  
  getHighScores(){
  try {
    const scores = localStorage.getItem("quizHighScores");
    if (scores) {
      return JSON.parse(scores);
    } else {
      return [];
    }
  } catch (error) {
    return [];
  }
}

isHighScore(){
  const scores = this.getHighScores();
  if (scores.length < 10) {
    return true;
  }
  const lowestScore = scores[scores.length - 1];
  return this.getScorePercentage() > lowestScore.percentage;
}

endQuiz() {
  const percentage = this.getScorePercentage();
  const isNewHighScore = this.isHighScore();
  if (isNewHighScore) {
    this.saveHighScore();
  }
  const highScores = this.getHighScores();
  const medals = ["gold", "silver", "bronze"];
  const leaderboardItems = highScores.map((entry, i) => `
    <li class="leaderboard-item ${medals[i] || ""}">
      <span class="leaderboard-rank">#${i + 1}</span>
      <span class="leaderboard-name">${entry.name}</span>
      <span class="leaderboard-score">${entry.percentage}%</span>
    </li>
  `).join("");
  return `
    <div class="game-card results-card">
      <h2 class="results-title">Quiz Complete!</h2>
      <p class="results-score-display">${this.score}/${this.numberOfQuestions}</p>
      <p class="results-percentage">${percentage}% Accuracy</p>
      ${isNewHighScore ? `
        <div class="new-record-badge">
          <i class="fa-solid fa-star"></i> New High Score!
        </div>
      ` : ""}
      <div class="leaderboard">
        <h4 class="leaderboard-title">
          <i class="fa-solid fa-trophy"></i> Leaderboard
        </h4>
        <ul class="leaderboard-list">
          ${leaderboardItems}
        </ul>
      </div>
      <div class="action-buttons">
        <button class="btn-restart">
          <i class="fa-solid fa-rotate-right"></i> Play Again
        </button>
      </div>
    </div>
  `;
}
}
