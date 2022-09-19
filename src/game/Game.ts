import { IGame } from "../implements/IGame";
import { ErrorProps, errors } from "../utils/error";
import { Player } from "./Player";
import { Room } from "./Room";

class Game implements IGame {
  rooms: Room[];
  players: Player[];

  constructor() {
    this.rooms = [];
    this.players = [];
  }

  joinRoom(player: Player, roomId: Room["id"]): Room | ErrorProps {
    const room = this.findRoom(roomId);

    if ("code" in room) {
      return room;
    }

    const players = Object.keys(room.players);

    if (players.length < 1) {
      return errors.room.notFind;
    }

    if (players.length >= 2) {
      return errors.room.isFull;
    }

    room.players[2] = player;

    return room;
  }

  leaveRoom(player: Player, roomId: Room["id"]): Room | ErrorProps {
    throw new Error("Method not implemented.");
  }

  findRoom(roomId: Room["id"]): Room | ErrorProps {
    const room = this.rooms.find((room) => room.id === roomId);

    if (!room || !room.id) {
      return errors.room.notFind;
    }

    return room;
  }

  createPlayer(name: Player["name"]): Player | ErrorProps {
    const id: Player["id"] = this.generatePlayerCode();

    const existingPlayer = this.findPlayer(id);

    if (!("code" in existingPlayer)) {
      return existingPlayer;
    }

    const player = new Player(id, name);

    this.players.push(player);

    return player;
  }

  deletePlayer(id: Player["id"]): void {
    this.players = this.players.filter((player) => player.id !== id);
  }

  findPlayer(id: Player["id"]): Player | ErrorProps {
    const player = this.players.find((player) => player.id === id);

    if (!player || !player.id) {
      return errors.player.notFind;
    }

    return player;
  }

  generateRoomCode(): string {
    let code = "";

    for (let i = 0; i < 5; i++) {
      code += Math.floor(Math.random() * 10);
    }

    const existingRoom = this.findRoom(code);

    if ("code" in existingRoom) {
      return code;
    }

    return this.generateRoomCode();
  }

  generatePlayerCode(): string {
    let code = "";

    for (let i = 0; i < 5; i++) {
      code += Math.floor(Math.random() * 10);
    }

    const existingPlayer = this.findPlayer(code);

    if ("code" in existingPlayer) {
      return code;
    }

    return this.generatePlayerCode();
  }

  generateRoom(player: Player): Room | ErrorProps {
    const code = this.generateRoomCode();

    const room = new Room(code, player);

    this.rooms.push(room);

    return room;
  }
}

export default new Game();
