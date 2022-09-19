import {
  clearSessionStorage,
  getSessionStorage,
  setSessionStorage,
} from "./utils/sessionStorage.js";

socket.on("disconnect", () => {
  clearSessionStorage();
});

socket.on("rooms", (rooms) => {
  const roomsContainer = document.getElementById("roomsContainer");

  roomsContainer.innerHTML = "";

  rooms.forEach((room) => {
    roomsContainer.innerHTML += `
      <div class="room">
        <div class="room-name">
          <span>Sala-${room.id}</span>
        </div>

        <div class="room-button">
          <button class="btn btn-primary" onclick="joinRoom('${room.id}')">Entrar</button>
        </div>
      </div>
    `;
  });
});

socket.on("roomCreated", (room) => {
  if (!room) {
    return;
  }

  if ("code" in room) {
    alert(room.message);

    return;
  }

  setSessionStorage("room", room);

  window.location.href = `/room/${room.id}`;
});

window.onload = () => {
  socket.emit("getRooms");

  const createRoomButton = document.getElementById("createRoom");

  const player = getSessionStorage("player");

  if (!player || !player.id) {
    window.location.href = "/";
  }

  createRoomButton.addEventListener("click", () => {
    socket.emit("createRoom", player);
  });
};
