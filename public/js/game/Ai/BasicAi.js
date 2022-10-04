class BasicAi {
  constructor(ai) {
    this.id = ai.id;
    this.name = ai.name;
    this.score = 0;
    this.difficulty = "easy";
    this.playerTurn = ai.playerTurn || 2;
  }

  addScore() {
    this.score++;
  }

  resetScore() {
    this.score = 0;
  }

  getAiMove(board) {
    const availableMoves = board.availablePositions();

    return availableMoves[Math.floor(Math.random() * availableMoves.length)];
  }
}

export { BasicAi };
