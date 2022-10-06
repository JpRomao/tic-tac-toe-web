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

        <div>
          <button class="room-button">Entrar</button>
        </div>
      </div>
    `;
  });

  const joinRoomButtons = document.getElementsByClassName("room-button");

  for (let i = 0; i < joinRoomButtons.length; i++) {
    joinRoomButtons[i].addEventListener("click", () => {
      console.log("oi");
    });
  }
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

socket.on("roomJoined", (room) => {
  if (!room) {
    return;
  }

  if ("code" in room) {
    alert(room.message);

    return;
  }

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
