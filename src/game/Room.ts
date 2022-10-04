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
  turns: number;
  draws: number;
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
    this.turns = 0;
    this.draws = 0;
    this.winner = 0;
    this.board = new Board();
    this.isPrivate = false;
    this.isRunning = true;
    this.isAiActive = true;
    this.ai = new HardAi();
  }

  addPlayer(player: Player) {
    this.players[2] = player;
  }

  removePlayer(player: Player) {
    if (this.players[1].id === player.id) {
      this.players[1] = this.players[2];

      this.players[2] = {
        playerTurn: 2,
      } as Player;
    } else if (this.players[2].id === player.id) {
      this.players[1] = {
        ...this.players[1],
        playerTurn: 1,
      } as Player;

      this.players[2] = {
        playerTurn: 2,
      } as Player;
    }
  }
}

export { Room };
