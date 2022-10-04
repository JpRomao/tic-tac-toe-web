import { BasicAi } from "../Ai/BasicAi.js";
import { HardAi } from "../Ai/HardAi.js";
import { Board } from "../Board/Board.js";
import { Player } from "../Player/Player.js";

class Room {
  constructor(room) {
    this.id = room.id;
    this.name = room.name;
    this.players = {
      1: room.players[1] ? new Player(room.players[1]) : {},
      2: {},
    };
    this.playerTurn = room.playerTurn || 1;
    this.turns = 0;
    this.draws = room.draws || 0;
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

  resetGame() {
    this.board.resetBoard();
    this.turns = 0;
    this.winner = 0;
    this.isRunning = true;
    this.playerTurn = 1;
    this.players[1].playerTurn = this.players[1].playerTurn === 1 ? 2 : 1;
    this.players[2].playerTurn = this.players[2].playerTurn === 1 ? 2 : 1;
    this.ai.playerTurn = this.players[1].playerTurn === 1 ? 2 : 1;

    if (this.isAiActive && this.ai.playerTurn === this.playerTurn) {
      const aiMove = this.ai.getAiMove(this.board);

      this.board.board[aiMove] = this.ai.playerTurn;

      this.passTurn();
    }
  }

  play(index) {
    if (this.isAiActive && this.isRunning) {
      this.board.setBoard(index, this.players[1].playerTurn);

      this.checkWinner();

      this.passTurn();

      if (this.isRunning) {
        this.aiPlay();

        this.checkWinner();

        this.passTurn();
      }
    }
  }

  aiPlay() {
    const aiMove = this.ai.getAiMove(this.board);

    this.board.setBoard(aiMove, this.ai.playerTurn);
  }

  checkWinner() {
    const winner = this.board.checkWinner();

    if (winner) {
      if (this.isAiActive && winner === this.ai.playerTurn) {
        this.ai.score++;
      } else if (winner === this.players[1].playerTurn) {
        this.players[1].score++;
      } else if (winner === this.players[2].playerTurn) {
        this.players[2].score++;
      } else {
        this.draws++;
      }

      this.winner = winner;
      this.isRunning = false;
    }
  }

  passTurn() {
    this.turns++;

    this.playerTurn = this.playerTurn === 1 ? 2 : 1;
  }
}

export { Room };
