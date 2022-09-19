import {
  clearSessionStorage,
  getSessionStorage,
  removeSessionStorage,
  setSessionStorage,
} from "./utils/sessionStorage.js";
import { Room } from "./game/Room/room.js";

socket.on("roomData", (room) => {
  setSessionStorage("room", room);

  document.querySelector("#roomHeader h1").innerHTML = room.name;

  document.title = room.name;

  const board = document.getElementById("board");

  board.innerHTML = "";

  for (let i = 0; i < 9; i++) {
    board.innerHTML += `
      <div class="board-cell">${
        room.board.board[i] === 1 ? "X" : room.board.board[i] === 2 ? "O" : ""
      }</div>
    `;
  }

  const boardCells = document.querySelectorAll(".board-cell");

  boardCells.forEach((cell, index) => {
    cell.addEventListener("click", () => {
      if (room.board.board[index] !== 0) return;

      if (room.isAiActive) {
        play();

        return;
      }

      socket.emit("play", room.id, index, player);
    });
  });
});

socket.on("played", (room) => {});

window.onload = () => {
  const room = getSessionStorage("room");
  const player = getSessionStorage("player");

  if (!player || !player.id) {
    clearSessionStorage();

    window.location.href = "/";

    return;
  }

  if (!room || !room.id) {
    removeSessionStorage("room");

    window.location.href = "/lobby";

    return;
  }

  const roomId = window.location.pathname.split("/")[2];

  socket.emit("getRoomData", roomId);
};

function play(index) {
  const room = getSessionStorage("room");

  if (!room || !room.id) {
    const roomId = window.location.pathname.split("/")[2];

    socket.emit("getRoomData", roomId);

    return;
  }

  const offRoom = new Room(room);

  if (offRoom.playerTurn === offRoom.ai.playerTurn) {
    const aiMove = offRoom.ai.getAiMove(offRoom.board);

    offRoom.board.board[aiMove] = offRoom.ai.playerTurn;
  } else {
    offRoom.board.board[index] = offRoom.players[1].playerTurn;
  }

  console.log(aiMove);
}
