class HardAi {
  constructor(ai) {
    this.id = ai.id;
    this.name = ai.name;
    this.score = 0;
    this.difficulty = "hard";
    this.playerTurn = 2;
  }

  getAiMove(board) {
    const move = this.getBestMove(board);

    console.log("move", move);

    return move;
  }

  getBestMove(board) {
    const availableMoves = board.availablePositions();

    let bestScore = -Infinity;
    let bestMove = 0;

    for (let i = 0; i < availableMoves.length; i++) {
      const move = availableMoves[i];

      board.setBoard(move, this.playerTurn);

      const score = this.minimax(board, false);

      board.setBoard(move, 0);

      if (score > bestScore) {
        bestScore = score;
        bestMove = move;
      }
    }

    return bestMove;
  }

  minimax(board, isMaximizing) {
    const result = board.checkWinner();

    if (result === this.playerTurn) {
      return 10;
    } else if (result === (this.playerTurn === 1 ? 2 : 1)) {
      return -10;
    } else if (result === 3) {
      return 0;
    }

    if (isMaximizing) {
      let bestScore = -Infinity;

      const availableMoves = board.availablePositions();

      for (let i = 0; i < availableMoves.length; i++) {
        const move = availableMoves[i];

        board.setBoard(move, this.playerTurn);

        const score = this.minimax(board, false);

        board.setBoard(move, 0);

        bestScore = Math.max(score, bestScore);
      }

      return bestScore;
    } else {
      let bestScore = Infinity;

      const availableMoves = board.availablePositions();

      for (let i = 0; i < availableMoves.length; i++) {
        const move = availableMoves[i];

        board.setBoard(move, this.playerTurn);

        const score = this.minimax(board, false);

        board.setBoard(move, 0);

        bestScore = Math.min(score, bestScore);
      }

      return bestScore;
    }
  }
}

export { HardAi };
