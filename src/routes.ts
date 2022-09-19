import { Router } from "express";
import path from "path";

const router = Router();

router.get("/", (_, response) => {
  response.sendFile(path.join(__dirname, "../public/home/home.html"));
});

router.get("/lobby", (request, response) => {
  response.sendFile(path.join(__dirname, "../public/lobby/lobby.html"));
});

router.get("/room/:id", (request, response) => {
  const room = request.params.id;

  if (!room) {
    response.redirect("/lobby");
  }

  response.sendFile(path.join(__dirname, "../public/room/room.html"));
});

export default router;
