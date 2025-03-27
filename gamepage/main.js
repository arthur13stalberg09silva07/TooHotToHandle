// const canvas = document.getElementById("gameCanvas");
// const ctx = canvas.getContext("2d");
// const timerDisplay = document.getElementById("timer");

// let players = [
//   {
//     x: 100,
//     y: 150,
//     width: 50,
//     height: 50,
//     color: "blue",
//     keys: { up: 38, down: 40, left: 37, right: 39 },
//   },
//   {
//     x: 400,
//     y: 150,
//     width: 50,
//     height: 50,
//     color: "red",
//     keys: { up: 87, down: 83, left: 65, right: 68 },
//   },
// ];

// let batata = { holder: 0, width: 20, height: 20 };
// let keysPressed = {};
// let gameTime = 90;
// let gameRunning = true;

// function drawPlayers() {
//   players.forEach((player, index) => {
//     ctx.fillStyle = player.color;
//     ctx.fillRect(player.x, player.y, player.width, player.height);

//     if (batata.holder === index) {
//       ctx.fillStyle = "yellow";
//       ctx.fillRect(player.x + 15, player.y - 20, batata.width, batata.height);
//     }
//   });
// }

// function movePlayers() {
//   players.forEach((player) => {
//     if (keysPressed[player.keys.left] && player.x > 0) player.x -= 5;
//     if (
//       keysPressed[player.keys.right] &&
//       player.x < canvas.width - player.width
//     )
//       player.x += 5;
//     if (keysPressed[player.keys.up] && player.y > 0) player.y -= 5;
//     if (
//       keysPressed[player.keys.down] &&
//       player.y < canvas.height - player.height
//     )
//       player.y += 5;
//   });
// }

// function checkCollision() {
//   let p1 = players[0],
//     p2 = players[1];
//   if (
//     p1.x < p2.x + p2.width &&
//     p1.x + p1.width > p2.x &&
//     p1.y < p2.y + p2.height &&
//     p1.y + p1.height > p2.y
//   ) {
//     batata.holder = 1 - batata.holder;
//   }
// }

// function updateTimer() {
//   if (gameRunning) {
//     gameTime--;
//     timerDisplay.textContent = gameTime;
//     if (gameTime <= 0) endGame();
//   }
// }

// function endGame() {
//   gameRunning = false;
//   let loser = batata.holder;
//   players[loser].color = "white";
//   setTimeout(() => {
//     players[loser].color = loser === 0 ? "blue" : "red";
//     batata.holder = Math.floor(Math.random() * 2);
//     gameTime = 90;
//     gameRunning = true;
//   }, 5000);
// }

// function gameLoop() {
//   ctx.clearRect(0, 0, canvas.width, canvas.height);
//   movePlayers();
//   checkCollision();
//   drawPlayers();
//   if (gameRunning) requestAnimationFrame(gameLoop);
// }

// document.addEventListener("keydown", (e) => (keysPressed[e.keyCode] = true));
// document.addEventListener("keyup", (e) => (keysPressed[e.keyCode] = false));

// setInterval(updateTimer, 1000);
// gameLoop();

function startGame() {
  window.location.href = "index.html";
}

const personagem1 = document.getElementById("personagem1");
const personagem2 = document.getElementById("personagem2");
const personagem1Img = document.getElementById("personagem1Img");
const personagem2Img = document.getElementById("personagem2Img");
 
const larguraTela = window.innerWidth;
const alturaTela = window.innerHeight;

let velocidadeP1 = 5;
let velocidadeP2 = 5;
const VELOCIDADE_PADRAO = 5;
const VELOCIDADE_AUMENTADA = 10;
 
let pos1 = { x: 0, y: alturaTela / 2 };
let pos2 = { x: larguraTela - 100, y: alturaTela / 2 };

// Controle individual de teclas pressionadas
let teclasPersonagem1 = {};
let teclasPersonagem2 = {};
 
let animacaoRodando1 = false;
let animacaoRodando2 = false;
 
let timeoutParado1, timeoutParado2; // Para detectar parada individual

movimentoPermitido = true; //para pausar no fim do jogo

//escolher jogador inicial
function sortearBatata() {
    const random = Math.floor(Math.random() * 2) + 1;
    console.log(random);    

    if (random == 1) {
        personagem1Img.src = "../assets/jp_poses/frente_batata.png"
        personagem1Img.classList.add('batata')
    }
    else {
        personagem2Img.src = "../assets/stalberg_poses/frente_batata.png"
        personagem2Img.classList.add('batata')
    }
}

sortearBatata()

//passar batata
function verificarColisao() {
    const rect1 = personagem1.getBoundingClientRect();
    const rect2 = personagem2.getBoundingClientRect();

    return !(rect1.right < rect2.left || 
             rect1.left > rect2.right || 
             rect1.bottom < rect2.top || 
             rect1.top > rect2.bottom);
}

function passarBatata() {
    if (personagem1Img.classList.contains('batata') && !personagem2Img.classList.contains('batata')) {

        personagem1Img.classList.remove('batata');
        personagem2Img.classList.add('batata');
    } else if (!personagem1Img.classList.contains('batata') && personagem2Img.classList.contains('batata')) {

        personagem2Img.classList.remove('batata');
        personagem1Img.classList.add('batata');
    }
}

//explosão
function ativarExplosao() {
    movimentoPermitido = false;
    if (personagem1Img.classList.contains('batata')) {
        personagem1Img.src = "../assets/gifs/explosion.gif";
        personagem2Img.src = "../assets/stalberg_poses/frente.png"
    } else if (personagem2Img.classList.contains('batata')) {
        personagem2Img.src = "../assets/gifs/explosion.gif";
        personagem1Img.src = "../assets/jp_poses/frente.png"
    }

    finalizarJogo();
}

//finalizar
function finalizarJogo() {
    jogoFinalizado = true;
    alert("O jogo acabou! A batata explodiu!");
}

//funções de poderes
function gerarPowerUp() {
    let powerUp = document.getElementById("powerUp");
    powerUp.style.display = "block";
    let x = Math.random() * (larguraTela - 30);
    let y = Math.random() * (alturaTela - 30);
    powerUp.style.left = `${x}px`;
    powerUp.style.top = `${y}px`;
}

function verificarColisaoComPowerUp() {
    let powerUp = document.getElementById("powerUp");
    let rectPowerUp = powerUp.getBoundingClientRect();
    let rectP1 = personagem1.getBoundingClientRect();
    let rectP2 = personagem2.getBoundingClientRect();
    let timeout = Math.floor(Math.random() * (10000 - 20000 + 1)) + 10000;
 
    if (
        rectP1.left < rectPowerUp.right &&
        rectP1.right > rectPowerUp.left &&
        rectP1.top < rectPowerUp.bottom &&
        rectP1.bottom > rectPowerUp.top
    ) {
        ativarPoder(1);
        powerUp.style.display = "none";
        setTimeout(() => {
            powerUp.style.display = "block";
            gerarPowerUp();
        }, timeout);
    }
 
    if (
        rectP2.left < rectPowerUp.right &&
        rectP2.right > rectPowerUp.left &&
        rectP2.top < rectPowerUp.bottom &&
        rectP2.bottom > rectPowerUp.top
    ) {
        ativarPoder(2);
        powerUp.style.display = "none";
        setTimeout(() => {
            powerUp.style.display = "block";
            gerarPowerUp();
        }, timeout);
    }
}

gerarPowerUp();

function posicionarPersonagens() {
    personagem1.style.left = pos1.x + "px";
    personagem1.style.top = pos1.y + "px";
 
    personagem2.style.left = pos2.x + "px";
    personagem2.style.top = pos2.y + "px";
}

window.onload = () => {
    posicionarPersonagens();
};

function ativarPoder(personagem) {
    if (personagem === 1) {
        velocidadeP1 = VELOCIDADE_AUMENTADA;
        setTimeout(() => {
            velocidadeP1 = VELOCIDADE_PADRAO;
        }, 5000);
    }
 
    if (personagem === 2) {
        velocidadeP2 = VELOCIDADE_AUMENTADA;
        setTimeout(() => {
            velocidadeP2 = VELOCIDADE_PADRAO;
        }, 5000);
    }
}
 
document.addEventListener("keydown", (event) => {
    if (["w", "a", "s", "d", "W", "A", "S", "D"].includes(event.key)) {
        teclasPersonagem1[event.key] = true;
        iniciarMovimento(1);
        clearTimeout(timeoutParado1);
    }
 
    if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(event.key)) {
        teclasPersonagem2[event.key] = true;
        iniciarMovimento(2);
        clearTimeout(timeoutParado2);
    }
});
 
document.addEventListener("keyup", (event) => {
    if (["w", "a", "s", "d", "W", "A", "S", "D"].includes(event.key)) {
        delete teclasPersonagem1[event.key];
        verificarParado(1);
    }
 
    if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(event.key)) {
        delete teclasPersonagem2[event.key];
        verificarParado(2);
    }
});
 
function verificarParado(personagem) {
    if (personagem === 1 && Object.keys(teclasPersonagem1).length === 0 && personagem1Img.classList.contains('batata')) {
        animacaoRodando1 = false;
        personagem1Img.src = "../assets/jp_poses/frente_batata.png";
    }
    else if (personagem === 1 && Object.keys(teclasPersonagem1).length === 0) {
        animacaoRodando1 = false;
        personagem1Img.src = "../assets/jp_poses/frente.png";
    }
 
    if (personagem === 2 && Object.keys(teclasPersonagem2).length === 0 && personagem2Img.classList.contains('batata')) {
        animacaoRodando2 = false;
        personagem2Img.src = "../assets/stalberg_poses/frente_batata.png";
    }
    else if (personagem === 2 && Object.keys(teclasPersonagem2).length === 0) {
        animacaoRodando2 = false;
        personagem2Img.src = "../assets/stalberg_poses/frente.png";
    }
}
 
function movimentarPersonagem1() {
    if (!movimentoPermitido) return;
    let moveu = false;
 
    if (teclasPersonagem1["w"] || teclasPersonagem1["W"]) {
        pos1.y -= velocidadeP1;
        if (personagem1Img.classList.contains('batata')) {
            personagem1Img.src = "../assets/jp_poses/cima_batata.png";
        } else {
            personagem1Img.src = "../assets/jp_poses/cima.png";
        }
        moveu = true;
    }
    

    if (teclasPersonagem1["s"] || teclasPersonagem1["S"]) {
        if (pos1.y < alturaTela - personagem1.clientHeight) {
            pos1.y += velocidadeP1;
            if (personagem1Img.classList.contains('batata')) {
                personagem1Img.src = "../assets/jp_poses/baixo_batata.png";
            } else {
                personagem1Img.src = "../assets/jp_poses/baixo.png";
            }
            moveu = true;
        }
    }

    if (teclasPersonagem1["a"] || teclasPersonagem1["A"]) {
        if (pos1.x > 0) {
            pos1.x -= velocidadeP1;
            if (personagem1Img.classList.contains('batata')) {
                personagem1Img.src = "../assets/jp_poses/lado_batata.png";
                personagem1Img.style.transform = "scaleX(-1)";
            } else {
                personagem1Img.src = "../assets/jp_poses/lado.png";
                personagem1Img.style.transform = "scaleX(-1)";
            }
            moveu = true;
        }
    }

    if (teclasPersonagem1["d"] || teclasPersonagem1["D"]) {
        if (pos1.x < larguraTela - personagem1.clientWidth) {
            pos1.x += velocidadeP1;
            if (personagem1Img.classList.contains('batata')) {
                personagem1Img.src = "../assets/jp_poses/lado_batata.png";
                personagem1Img.style.transform = "scaleX(1)";
            } else {
                personagem1Img.src = "../assets/jp_poses/lado.png";
                personagem1Img.style.transform = "scaleX(1)";
            }
            moveu = true;
        }
    }
 
    if (moveu) clearTimeout(timeoutParado1);
 
    personagem1.style.top = pos1.y + "px";
    personagem1.style.left = pos1.x + "px";

    if (verificarColisao()) {
        passarBatata();
    }
}
 
function movimentarPersonagem2() {
    if (!movimentoPermitido) return;
    let moveu = false;
 
    if (teclasPersonagem2["ArrowUp"]) {
        pos2.y -= velocidadeP2;
        if (personagem2Img.classList.contains('batata')) {
            personagem2Img.src = "../assets/stalberg_poses/cima_batata.png";
        } else {
            personagem2Img.src = "../assets/stalberg_poses/cima.png";
        }
        moveu = true;
    }

    if (teclasPersonagem2["ArrowDown"]) {
        if (pos2.y < alturaTela - personagem2.clientHeight) {
            pos2.y += velocidadeP2;
            if (personagem2Img.classList.contains('batata')) {
                personagem2Img.src = "../assets/stalberg_poses/baixo_batata.png";
            } else {
                personagem2Img.src = "../assets/stalberg_poses/baixo.png";
            }
            moveu = true;
        }
    }


    if (teclasPersonagem2["ArrowLeft"]) {
        if (pos2.x > 0) {
            pos2.x -= velocidadeP2;
            if (personagem2Img.classList.contains('batata')) {
                personagem2Img.src = "../assets/stalberg_poses/lado_batata.png";
                personagem2Img.style.transform = "scaleX(-1)";
            } else {
                personagem2Img.src = "../assets/stalberg_poses/lado.png";
                personagem2Img.style.transform = "scaleX(-1)";
            }
            moveu = true;
        }
    }

    if (teclasPersonagem2["ArrowRight"]) {
        if (pos2.x < larguraTela - personagem2.clientWidth) {
            pos2.x += velocidadeP2;
            if (personagem2Img.classList.contains('batata')) {
                personagem2Img.src = "../assets/stalberg_poses/lado_batata.png";
                personagem2Img.style.transform = "scaleX(1)";
            } else {
                personagem2Img.src = "../assets/stalberg_poses/lado.png";
                personagem2Img.style.transform = "scaleX(1)";
            }
            moveu = true;
        }
    }
 
    if (moveu) clearTimeout(timeoutParado2);
 
    personagem2.style.top = pos2.y + "px";
    personagem2.style.left = pos2.x + "px";

    if (verificarColisao()) {
        passarBatata();
    }
}
 
function loopMovimento1() {
    if (!animacaoRodando1) return;
    movimentarPersonagem1();
    verificarColisaoComPowerUp();
    verificarColisaoComPowerUpAumenta();
    verificarColisaoComPowerUpDiminui();
    requestAnimationFrame(loopMovimento1);
}
 
function loopMovimento2() {
    if (!animacaoRodando2) return;
    movimentarPersonagem2();
    verificarColisaoComPowerUp();
    verificarColisaoComPowerUpAumenta();
    verificarColisaoComPowerUpDiminui();
    requestAnimationFrame(loopMovimento2);
}
 
function iniciarMovimento(personagem) {
    if (personagem === 1 && !animacaoRodando1) {
        animacaoRodando1 = true;
        requestAnimationFrame(loopMovimento1);
    }
    if (personagem === 2 && !animacaoRodando2) {
        animacaoRodando2 = true;
        requestAnimationFrame(loopMovimento2);
    }
}

document.addEventListener("keydown", (event) => {
    if (event.key === "e") {
        ativarPoder(1);
    }
 
    if (event.key === "Shift") {
        ativarPoder(2);
    }
});

//timer
let time = 90

function montarCronometro(segundos) {
    const minutos = Math.floor(segundos / 60);
    const segundosRestantes = segundos % 60;
    return { minutos, segundos: segundosRestantes };
} 

function atualizarCronometro() {
    const { minutos, segundos } = montarCronometro(time);
    document.getElementById("minutos").textContent = String(minutos).padStart(2, '0');
    document.getElementById("segundos").textContent = String(segundos).padStart(2, '0');
}

function iniciarCronometro() {
    atualizarCronometro();
    const interval = setInterval(() => {
        if (time > 0) {
            time--;
            atualizarCronometro();
        } else {
            clearInterval(interval);
            ativarExplosao();
        }
    }, 1000);
}

iniciarCronometro()

//gerar power up
function gerarPowerUpAumenta() {
    let powerUp = document.getElementById("powerUpAumenta");
    powerUp.style.display = "block";
    let x = Math.random() * (larguraTela - 30);
    let y = Math.random() * (alturaTela - 30);
    powerUp.style.left = `${x}px`;
    powerUp.style.top = `${y}px`;
}

function ativarPoderAumenta(personagem) {
    if (personagem === 1) {
        time += 10
    }
 
    if (personagem === 2) {
        time +=10
    }
}

function verificarColisaoComPowerUpAumenta() {
    let powerUp = document.getElementById("powerUpAumenta");
    let rectPowerUp = powerUp.getBoundingClientRect();
    let rectP1 = personagem1.getBoundingClientRect();
    let rectP2 = personagem2.getBoundingClientRect();
    let timeout = Math.floor(Math.random() * (10000 - 20000 + 1)) + 10000;
 
    if (
        rectP1.left < rectPowerUp.right &&
        rectP1.right > rectPowerUp.left &&
        rectP1.top < rectPowerUp.bottom &&
        rectP1.bottom > rectPowerUp.top
    ) {
        ativarPoderAumenta(1);
        powerUp.style.display = "none";
        setTimeout(() => {
            powerUp.style.display = "block";
            gerarPowerUpAumenta();
        }, timeout);
    }
 
    if (
        rectP2.left < rectPowerUp.right &&
        rectP2.right > rectPowerUp.left &&
        rectP2.top < rectPowerUp.bottom &&
        rectP2.bottom > rectPowerUp.top
    ) {
        ativarPoderAumenta(2);
        powerUp.style.display = "none";
        setTimeout(() => {
            powerUp.style.display = "block";
            gerarPowerUpAumenta();
        }, timeout);
    }
}

gerarPowerUpAumenta();

function gerarPowerUpDiminui() {
    let powerUp = document.getElementById("powerUpDiminui");
    powerUp.style.display = "block";
    let x = Math.random() * (larguraTela - 30);
    let y = Math.random() * (alturaTela - 30);
    powerUp.style.left = `${x}px`;
    powerUp.style.top = `${y}px`;
}
 
function ativarPoderDiminui(personagem) {
    if (personagem === 1) {
        time -= 10
    }
 
    if (personagem === 2) {
        time -= 10
    }
}

function verificarColisaoComPowerUpDiminui() {
    let powerUp = document.getElementById("powerUpDiminui");
    let rectPowerUp = powerUp.getBoundingClientRect();
    let rectP1 = personagem1.getBoundingClientRect();
    let rectP2 = personagem2.getBoundingClientRect();
    let timeout = Math.floor(Math.random() * (10000 - 20000 + 1)) + 10000;
 
    if (
        rectP1.left < rectPowerUp.right &&
        rectP1.right > rectPowerUp.left &&
        rectP1.top < rectPowerUp.bottom &&
        rectP1.bottom > rectPowerUp.top
    ) {
        ativarPoderDiminui(1);
        powerUp.style.display = "none";
        setTimeout(() => {
            powerUp.style.display = "block";
            gerarPowerUpDiminui();
        }, timeout);
    }
 
    if (
        rectP2.left < rectPowerUp.right &&
        rectP2.right > rectPowerUp.left &&
        rectP2.top < rectPowerUp.bottom &&
        rectP2.bottom > rectPowerUp.top
    ) {
        ativarPoderDiminui(2);
        powerUp.style.display = "none";
        setTimeout(() => {
            powerUp.style.display = "block";
            gerarPowerUpDiminui();
        }, timeout);
    }
}

gerarPowerUpDiminui();