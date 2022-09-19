import { BasicAi } from "game/Ai/BasicAi";
import { HardAi } from "game/Ai/HardAi";
import { Board } from "../game/Board";
import { Player } from "../game/Player";

export interface IRoom {
  id: string;
  name: string;
  players: {
    1: Player;
    2: Player;
  };
  playerTurn: 1 | 2;
  winner: 0 | 1 | 2 | 3;
  board: Board;
  isPrivate: boolean;
  isRunning: boolean;
  isAiActive: boolean;
  ai: BasicAi | HardAi;
}
