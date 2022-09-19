import express from "express";
import { Server as SocketServer } from "socket.io";
import http from "http";

import router from "./routes";
import game from "./game/Game";
import { Player } from "game/Player";

const app = express();

app.use(express.static("public"));
app.use(express.static("node_modules/socket.io/client-dist"));

app.use(router);

const server = http.createServer(app);

const socket = new SocketServer(server);

socket.on("connection", (socket) => {
  console.log("Connected -> ", socket.id);

  socket.on("registerPlayer", (name: string) => {
    const player = game.createPlayer(name);

    if ("code" in player) {
      socket.emit("error", player);

      return;
    }

    socket.emit("playerRegistered", player);
  });

  socket.on("getPlayer", (id: Player["id"]) => {
    const player = game.findPlayer(id);

    if ("code" in player) {
      socket.emit("error", player);

      return;
    }

    socket.emit("playerFound", player);
  });

  socket.on("getRooms", () => {
    socket.emit("rooms", game.rooms);
  });

  socket.on("createRoom", (player: Player) => {
    const room = game.generateRoom(player);

    socket.emit("roomCreated", room);
  });

  socket.on("getRoomData", (roomId: string) => {
    const room = game.findRoom(roomId);

    if ("code" in room) {
      socket.emit("error", room);

      return;
    }

    socket.emit("roomData", room);
  });

  socket.on("joinRoom", (player: Player, roomId: string) => {
    const room = game.joinRoom(player, roomId);

    socket.emit("roomJoined", room);
  });

  socket.on("disconnect", () => {
    game.deletePlayer(socket.id);

    console.log("Disconnected");
  });
});

server.listen(3000, () => {
  console.log("Listening on port 3000");
});
