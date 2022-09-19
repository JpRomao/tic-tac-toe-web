class Board {
  constructor(board) {
    this.board = board ? board : Array(9).fill(0);
  }

  resetBoard() {
    this.board = Array(9).fill(0);
  }

  isBoardFull() {
    return this.board.every((position) => position !== 0);
  }

  isBoardEmpty() {
    return this.board.every((position) => position === 0);
  }

  isPositionAvailable(position) {
    return this.board[position] === 0;
  }

  availablePositions() {
    const availablePositions = [];

    this.board.forEach((position, index) => {
      if (position === 0) {
        availablePositions.push(index);
      }
    });

    return availablePositions;
  }

  checkWinner() {
    const winningLines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    if (this.isBoardFull()) {
      return 3;
    }

    for (let i = 0; i < winningLines.length; i++) {
      const [a, b, c] = winningLines[i];

      if (
        this.board[a] &&
        this.board[a] === this.board[b] &&
        this.board[a] === this.board[c]
      ) {
        return this.board[a];
      }
    }

    return 0;
  }

  setBoard(position, playerValue) {
    if (this.isPositionAvailable(position)) {
      this.board[position] = playerValue;
    }
  }

  getBoard() {
    return this.board;
  }
}

export { Board };
