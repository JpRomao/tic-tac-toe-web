class BasicAi {
  constructor() {
    this.id = "BasicAi";
    this.name = "AI";
    this.score = 0;
    this.difficulty = "easy";
    this.playerTurn = 2;
  }

  getAiMove(board) {
    const availableMoves = board.availablePositions();

    return availableMoves[Math.floor(Math.random() * availableMoves.length)];
  }
}

export { BasicAi };
