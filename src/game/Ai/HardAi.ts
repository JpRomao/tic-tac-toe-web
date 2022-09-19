import { IAi } from "../../implements/IAi";

class HardAi implements IAi {
  id: string;
  name: string;
  score: number;
  difficulty: "hard";
  playerTurn: 1 | 2;

  constructor() {
    this.id = "SpecialAi";
    this.name = "AI";
    this.score = 0;
    this.difficulty = "hard";
    this.playerTurn = 2;
  }
}

export { HardAi };
