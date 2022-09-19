import { Player } from "../game/Player";
import { Room } from "../game/Room";
import { ErrorProps } from "../utils/error";

export interface IGame {
  rooms: Room[];
  players: Player[];

  createPlayer(id: Player["id"], name: Player["name"]): Player | ErrorProps;
  deletePlayer(id: Player["id"]): void;
  findPlayer(id: Player["id"]): Player | ErrorProps;
  findRoom(id: Room["id"]): Room | ErrorProps;
  joinRoom(player: Player, roomId: Room["id"]): Room | ErrorProps;
  leaveRoom(player: Player, roomId: Room["id"]): Room | ErrorProps;
  generateRoom(player: Player): Room | ErrorProps;
  generatePlayerCode(): Player["id"];
  generateRoomCode(): Room["id"];
  deletePlayer(id: Player["id"]): void;
}
