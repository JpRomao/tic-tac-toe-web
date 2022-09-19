export type BoardAvailablePositions = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
export type BoardValidValues = 0 | 1 | 2;

export interface IBoard {
  board: BoardAvailablePositions[];

  isBoardFull(): boolean;
  isBoardEmpty(): boolean;
  isPositionAvailable(position: BoardAvailablePositions): boolean;
  availablePositions(): BoardAvailablePositions[];
  checkWinner(): 0 | 1 | 2 | 3;
  setBoard(position: BoardValidValues, playerValue: 1 | 2): void;
  getBoard(): BoardAvailablePositions[];
  resetBoard(): void;
}
