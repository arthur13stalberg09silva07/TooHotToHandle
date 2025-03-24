const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const timerDisplay = document.getElementById("timer");

let players = [
  {
    x: 100,
    y: 150,
    width: 50,
    height: 50,
    color: "blue",
    keys: { up: 38, down: 40, left: 37, right: 39 },
  },
  {
    x: 400,
    y: 150,
    width: 50,
    height: 50,
    color: "red",
    keys: { up: 87, down: 83, left: 65, right: 68 },
  },
];

let batata = { holder: 0, width: 20, height: 20 };
let keysPressed = {};
let gameTime = 90;
let gameRunning = true;

function drawPlayers() {
  players.forEach((player, index) => {
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);

    if (batata.holder === index) {
      ctx.fillStyle = "yellow";
      ctx.fillRect(player.x + 15, player.y - 20, batata.width, batata.height);
    }
  });
}

function movePlayers() {
  players.forEach((player) => {
    if (keysPressed[player.keys.left] && player.x > 0) player.x -= 5;
    if (
      keysPressed[player.keys.right] &&
      player.x < canvas.width - player.width
    )
      player.x += 5;
    if (keysPressed[player.keys.up] && player.y > 0) player.y -= 5;
    if (
      keysPressed[player.keys.down] &&
      player.y < canvas.height - player.height
    )
      player.y += 5;
  });
}

function checkCollision() {
  let p1 = players[0],
    p2 = players[1];
  if (
    p1.x < p2.x + p2.width &&
    p1.x + p1.width > p2.x &&
    p1.y < p2.y + p2.height &&
    p1.y + p1.height > p2.y
  ) {
    batata.holder = 1 - batata.holder;
  }
}

function updateTimer() {
  if (gameRunning) {
    gameTime--;
    timerDisplay.textContent = gameTime;
    if (gameTime <= 0) endGame();
  }
}

function endGame() {
  gameRunning = false;
  let loser = batata.holder;
  players[loser].color = "white";
  setTimeout(() => {
    players[loser].color = loser === 0 ? "blue" : "red";
    batata.holder = Math.floor(Math.random() * 2);
    gameTime = 90;
    gameRunning = true;
  }, 5000);
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  movePlayers();
  checkCollision();
  drawPlayers();
  if (gameRunning) requestAnimationFrame(gameLoop);
}

document.addEventListener("keydown", (e) => (keysPressed[e.keyCode] = true));
document.addEventListener("keyup", (e) => (keysPressed[e.keyCode] = false));

setInterval(updateTimer, 1000);
gameLoop();

function startGame() {
  window.location.href = "index.html";
}
