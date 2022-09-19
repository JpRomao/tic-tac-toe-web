import {
  BoardAvailablePositions,
  IBoard,
  BoardValidValues,
} from "../implements/IBoard";

class Board implements IBoard {
  board: BoardValidValues[];

  constructor() {
    this.board = Array(9).fill(0);
  }

  resetBoard(): void {
    this.board = Array(9).fill(0);
  }

  isBoardFull(): boolean {
    return this.board.every((position) => position !== 0);
  }

  isBoardEmpty(): boolean {
    return this.board.every((position) => position === 0);
  }

  isPositionAvailable(position: BoardAvailablePositions): boolean {
    return this.board[position] === 0;
  }

  availablePositions(): BoardAvailablePositions[] {
    const availablePositions: BoardAvailablePositions[] = [];

    this.board.forEach((position, index) => {
      if (position === 0) {
        availablePositions.push(index as BoardAvailablePositions);
      }
    });

    return availablePositions;
  }

  checkWinner(): 0 | 1 | 2 | 3 {
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

  setBoard(position: BoardAvailablePositions, playerValue: 0 | 1 | 2): void {
    if (this.isPositionAvailable(position)) {
      this.board[position] = playerValue;
    }
  }

  getBoard(): BoardAvailablePositions[] {
    return this.board;
  }
}

export { Board };
