import { BasicAi } from "../Ai/BasicAi.js";
import { HardAi } from "../Ai/HardAi.js";
import { Board } from "../Board/board.js";
import { Player } from "../Player/player.js";

class Room {
  constructor(room) {
    this.id = room.id;
    this.name = room.name;
    this.players = {
      1: room.players[1] ? new Player(room.players[1]) : {},
      2: {},
    };
    this.playerTurn = room.playerTurn;
    this.winner = room.winner;
    this.board = new Board(room.board.board);
    this.isPrivate = room.isPrivate;
    this.isRunning = room.isRunning;
    this.isAiActive = room.isAiActive;
    this.ai =
      room.ai.difficulty === "hard"
        ? new HardAi(room.ai)
        : new BasicAi(room.ai);
  }
}

export { Room };
