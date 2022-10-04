class HardAi {
  constructor(ai) {
    this.id = ai.id;
    this.name = ai.name;
    this.score = 0;
    this.difficulty = "hard";
    this.playerTurn = ai.playerTurn || 2;
  }

  addScore() {
    this.score++;
  }

  resetScore() {
    this.score = 0;
  }

  getAiMove(board) {
    const move = this.getBestMove(board);
    console.log("ai move", move);
    return move;
  }

  getBestMove(board) {
    let bestScore = -Infinity;
    let move;

    for (let i = 0; i < 9; i++) {
      if (board.board[i] === 0) {
        board.board[i] = this.playerTurn;

        let score = this.minimax(board, 0, false);

        board.board[i] = 0;

        if (score > bestScore) {
          bestScore = score;
          move = i;
        }
      }
    }

    return move;
  }

  minimax(newBoard, depth, isMaximizing) {
    const result = newBoard.checkWinner();

    if (result === this.playerTurn) {
      return 10;
    } else if (result === (this.playerTurn === 1 ? 2 : 1)) {
      return -10;
    } else if (result === 3) {
      return 0;
    }

    if (isMaximizing) {
      let bestScore = -Infinity;

      for (let i = 0; i < 9; i++) {
        if (newBoard.board[i] === 0) {
          newBoard.board[i] = this.playerTurn;

          let score = this.minimax(newBoard, depth + 1, false);

          newBoard.board[i] = 0;

          bestScore = Math.max(score, bestScore);
        }
      }

      return bestScore;
    } else {
      let bestScore = Infinity;

      for (let i = 0; i < 9; i++) {
        if (newBoard.board[i] === 0) {
          newBoard.board[i] = this.playerTurn === 1 ? 2 : 1;

          let score = this.minimax(newBoard, depth + 1, true);

          newBoard.board[i] = 0;

          bestScore = Math.min(score, bestScore);
        }
      }

      return bestScore;
    }
  }
}

export { HardAi };
