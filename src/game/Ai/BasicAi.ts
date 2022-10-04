import { IAi } from "../../implements/IAi";

class BasicAi implements IAi {
  id: string;
  name: string;
  score: number;
  difficulty: "easy";
  playerTurn: 1 | 2;

  constructor() {
    this.id = "BasicAi";
    this.name = "AI";
    this.score = 0;
    this.difficulty = "easy";
    this.playerTurn = 2;
  }

  addScore(): void {
    this.score++;
  }

  resetScore(): void {
    this.score = 0;
  }
}

export { BasicAi };
