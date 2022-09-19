export interface IPlayer {
  id: string;
  name: string;
  type: "Human";
  score: number;
  playerTurn: 1 | 2;

  addScore(): void;
  resetScore(): void;
}
