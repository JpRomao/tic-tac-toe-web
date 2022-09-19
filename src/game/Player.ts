import { IPlayer } from "../implements/IPlayer";

class Player implements IPlayer {
  id: string;
  name: string;
  type: "Human";
  score: number;
  playerTurn: 1 | 2;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
    this.type = "Human";
    this.score = 0;
    this.playerTurn = 1;
  }

  addScore(): void {
    this.score++;
  }

  resetScore(): void {
    this.score = 0;
  }
}

export { Player };
