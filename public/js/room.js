import {
  clearSessionStorage,
  getSessionStorage,
  removeSessionStorage,
} from "./utils/sessionStorage.js";
import { Room } from "./game/Room/Room.js";

const player = getSessionStorage("player");

let room = getSessionStorage("room");

socket.on("roomData", (newRoom) => {
  room = newRoom;

  document.querySelector("#roomHeader h1").innerHTML = room.name;

  document.title = room.name;

  renderBoard(room.board.board);

  renderPlayerInfos();
});

socket.on("played", (newRoom) => {
  console.log("played", newRoom);
});

socket.on("roomLeaved", () => {
  removeSessionStorage("room");

  window.location.href = "/lobby";
});

window.onload = () => {
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

  const resetGameButton = document.getElementById("resetGame");

  resetGameButton.addEventListener("click", resetGame);

  const leaveRoomButton = document.getElementById("leaveRoom");

  leaveRoomButton.addEventListener("click", leaveRoom);

  const roomId = window.location.pathname.split("/")[2];

  socket.emit("getRoomData", roomId);
};

function play(index) {
  if (index < 0 || index > 8) {
    return;
  }

  if (!room || !room.id) {
    const roomId = window.location.pathname.split("/")[2];

    socket.emit("getRoomData", roomId);

    return;
  }

  const offRoom = new Room(room);

  if (offRoom.board.board[index] !== 0) {
    return;
  }

  offRoom.play(index);

  renderBoard(offRoom.board.board);

  room = new Room(offRoom);

  renderPlayerInfos();
}

function renderBoard(board) {
  const boardDiv = document.getElementById("board");

  boardDiv.innerHTML = "";

  for (let i = 0; i < 9; i++) {
    boardDiv.innerHTML += `
      <div class="${
        room.isRunning ? "board-cell" : "board-cell board-cell-filled"
      }">${board[i] === 1 ? "X" : board[i] === 2 ? "O" : ""}</div>
    `;
  }

  const boardCells = document.querySelectorAll(".board-cell");

  boardCells.forEach((cell, index) => {
    cell.addEventListener("click", () => {
      if (room.isAiActive) {
        play(index);

        return;
      }

      socket.emit("play", room.id, index, player);
    });

    if (room.board.board[index] !== 0) {
      cell.classList.add("board-cell-filled");

      return;
    }
  });
}

function renderPlayerInfos() {
  const playerInfo = (player) => {
    return `
      <p>${player.name}</p>
      <p class="score">${player.score}</p>
    `;
  };

  const playersInfos = document.getElementsByClassName("player");

  playersInfos[0].innerHTML = playerInfo(room.players[1]);

  if (room.players[2].id) {
    playersInfos[1].innerHTML = playerInfo(room.players[2]);
  } else {
    playersInfos[1].innerHTML = playerInfo(room.ai);
  }

  const drawsScore = document.querySelector("#draws .score");

  drawsScore.innerHTML = room.draws;

  return `
    <p>${player.name}</p>
    <p class="score">${player.score}</p>
  `;
}

function resetGame() {
  if (!room || !room.id) {
    const roomId = window.location.pathname.split("/")[2];

    socket.emit("getRoomData", roomId);

    return;
  }

  if (room.isAiActive) {
    room.resetGame();

    renderBoard(room.board.board);

    renderPlayerInfos();

    return;
  }

  socket.emit("resetGame", room.id, player);
}

function leaveRoom() {
  if (!room || !room.id) {
    const roomId = window.location.pathname.split("/")[2];

    socket.emit("getRoomData", roomId);

    return;
  }

  socket.emit("leaveRoom", room.id, player);
}
