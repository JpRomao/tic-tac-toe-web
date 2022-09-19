class Player {
  constructor(player) {
    this.id = player.id;
    this.name = player.name;
    this.type = "Human";
    this.score = player.score;
    this.playerTurn = player.playerTurn;
  }

  addScore() {
    this.score++;
  }

  resetScore() {
    this.score = 0;
  }
}

export { Player };
