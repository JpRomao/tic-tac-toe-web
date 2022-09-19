export interface IAi {
  id: string;
  name: string;
  score: number;
  difficulty: "easy" | "hard";
  playerTurn: 1 | 2;
}
