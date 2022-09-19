import {
  clearSessionStorage,
  getSessionStorage,
  removeSessionStorage,
  setSessionStorage,
} from "./utils/sessionStorage.js";
import { treatName } from "./utils/treatName.js";

socket.on("disconnect", () => {
  clearSessionStorage();
});

socket.on("playerFound", (player) => {
  if (player && player.id) {
    setSessionStorage("player", player);

    window.location.href = "/lobby";

    return;
  }

  removeSessionStorage("player");
});

socket.on("playerRegistered", (player) => {
  if ("code" in player) {
    alert(player.message);

    return;
  }

  setSessionStorage("player", player);

  window.location.href = `/lobby`;
});

function registerPlayer(event) {
  event.preventDefault();

  const name = treatName(document.getElementById("name").value);

  if (name.length > 4) {
    socket.emit("registerPlayer", name);
  } else {
    alert(
      "O nome precisa ter mais de 4 caracteres e não pode conter caracteres especiais."
    );
  }
}

window.onload = () => {
  const form = document.getElementById("playerForm");

  form.addEventListener("submit", registerPlayer);

  const player = getSessionStorage("player");

  if (player && player.id) {
    socket.emit("getPlayer", player);
  }
};

export { registerPlayer };
