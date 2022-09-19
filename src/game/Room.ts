import { IRoom } from "../implements/IRoom";
import { BasicAi } from "./Ai/BasicAi";
import { HardAi } from "./Ai/HardAi";
import { Board } from "./Board";
import { Player } from "./Player";

class Room implements IRoom {
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
  ai: HardAi | BasicAi;

  constructor(id: string, player: Player) {
    this.id = id;
    this.name = `Room-${id}`;
    this.players = {
      1: player,
      2: {
        playerTurn: 2,
      } as Player,
    };
    this.playerTurn = 1;
    this.winner = 0;
    this.board = new Board();
    this.isPrivate = false;
    this.isRunning = true;
    this.isAiActive = true;
    this.ai = new HardAi();
  }
}

export { Room };
