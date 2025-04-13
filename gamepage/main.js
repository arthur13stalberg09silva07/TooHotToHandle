const explosao = new Audio('../audios/explosao.mp3');
const coin = new Audio('../audios/coin.mp3');
const feliz = new Audio('../audios/feliz.mp3');
const fort = new Audio('../audios/fort.mp3');
const twinke = new Audio('../audios/twinke.mp3');

async function startGame() {  
    window.location.href = "main.html";
}
  
  const personagem1 = document.getElementById("personagem1");
  const personagem2 = document.getElementById("personagem2");
  const personagem1Img = document.getElementById("personagem1Img");
  const personagem2Img = document.getElementById("personagem2Img");
   
  const larguraTela = window.innerWidth;
  const alturaTela = window.innerHeight;
  
  const VELOCIDADE_PADRAO = 5;
  const VELOCIDADE_AUMENTADA = 10;
  let velocidadeP1 = VELOCIDADE_AUMENTADA;
  let velocidadeP2 = VELOCIDADE_AUMENTADA;
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
  async function sortearBatata() {
      const random = Math.floor(Math.random() * 2) + 1;
      localStorage.removeItem("vencedor")
  
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
  async function verificarColisao() { 
      const rect1 = personagem1.getBoundingClientRect();
      const rect2 = personagem2.getBoundingClientRect();
  
      return !(rect1.right < rect2.left || 
               rect1.left > rect2.right || 
               rect1.bottom < rect2.top || 
               rect1.top > rect2.bottom);
  }
  
  let podePassar = true;
  
  async function passarBatata() {
      if (!podePassar) return; 
  
      podePassar = false;
  
      if (personagem1Img.classList.contains('batata') && !personagem2Img.classList.contains('batata')) {
          personagem1Img.classList.remove('batata');
          personagem2Img.classList.add('batata');
          velocidadeP2 = 5.2
          velocidadeP1 = VELOCIDADE_PADRAO
      } else if (!personagem1Img.classList.contains('batata') && personagem2Img.classList.contains('batata')) {
          personagem2Img.classList.remove('batata');
          personagem1Img.classList.add('batata');
          velocidadeP1 = 5.2
          velocidadeP2 = VELOCIDADE_PADRAO
      }

      verificarParado(1);
      verificarParado(2);
  
      setTimeout(() => {
          podePassar = true;
      }, 700);
  }
  
  
  //explosão
  async function ativarExplosao() {
      movimentoPermitido = false;
      if (personagem1Img.classList.contains('batata')) {
          fort.play()  
          explosao.play()
          personagem1Img.src = "../assets/gifs/explosion.gif";
          console.log('jp explodiu');
          personagem2Img.src = "../assets/stalberg_poses/frente.png"
      } else if (personagem2Img.classList.contains('batata')) {
          fort.play()  
          personagem2Img.src = "../assets/gifs/explosion.gif";
          console.log('berg explodiu');
          personagem1Img.src = "../assets/jp_poses/frente.png"
      }
  
      setTimeout(()=>{
        finalizarJogo();
      }, 1800)  
  }
  
//finalizar
async function finalizarJogo() {
    feliz.play()
    let vencedor = personagem1Img.classList.contains("batata") ? 2 : 1;
    localStorage.setItem("vencedor", vencedor);
    window.location.href = "winPage.html";
}

async function posicaoValidaParaPowerUp(x, y) {
    // Cria um retângulo temporário para o power-up (assumindo tamanho 30x30)
    const rectPowerUp = {
        left: x,
        right: x + 30,
        top: y,
        bottom: y + 30
    };

    // Verifica colisão com todas as paredes
    for (let parede of document.querySelectorAll(".parede")) {
        const rectParede = parede.getBoundingClientRect();

        if (
            rectPowerUp.left < rectParede.right &&
            rectPowerUp.right > rectParede.left &&
            rectPowerUp.top < rectParede.bottom &&
            rectPowerUp.bottom > rectParede.top
        ) {
            return false; // Posição inválida (dentro de uma parede)
        }
    }

    return true; // Posição válida
}

async function gerarPosicaoValida() {
    let x, y;
    let tentativas = 0;
    const maxTentativas = 100; // Para evitar loops infinitos
    
    do {
        x = Math.random() * (larguraTela - 30);
        y = Math.random() * (alturaTela - 30);
        tentativas++;
        
        // Se tentou muitas vezes e não achou, retorna a posição mesmo assim
        if (tentativas >= maxTentativas) {
            return { x, y };
        }
    } while (!posicaoValidaParaPowerUp(x, y));
    
    return { x, y };
}
  
  //funções de poderes
  async function gerarPowerUp() {
    let powerUp = document.getElementById("powerUp");
    powerUp.style.display = "none";
    
    const intervalo = Math.floor(Math.random() * (15000 - 40000 + 1)) + 15000; // 15 a 40 segundos
    
    setTimeout(() => {
        const { x, y } = gerarPosicaoValida();
        powerUp.style.left = `${x}px`;
        powerUp.style.top = `${y}px`;
        powerUp.style.display = "block";
    }, intervalo);
}
  
async function verificarColisaoComPowerUp() {
      let powerUp = document.getElementById("powerUp");
      let rectPowerUp = powerUp.getBoundingClientRect();
      let rectP1 = personagem1.getBoundingClientRect();
      let rectP2 = personagem2.getBoundingClientRect();
   
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
          }, 5000);
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
          }, 5000);
      }
  }
  
  async function posicionarPersonagens() {
      personagem1.style.left = pos1.x + "px";
      personagem1.style.top = pos1.y + "px";
   
      personagem2.style.left = pos2.x + "px";
      personagem2.style.top = pos2.y + "px";
  }
  
  window.onload = () => {
      posicionarPersonagens();
  };
  
  async function ativarPoder(personagem) {
    twinke.play()
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
   
  async function verificarParado(personagem) {
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
   
  async function verificarColisaoComParedes(personagem, novaPosX, novaPosY) {
    const rectPersonagem = {
        left: novaPosX,
        right: novaPosX + personagem.clientWidth,
        top: novaPosY,
        bottom: novaPosY + personagem.clientHeight
    };

    for (let parede of document.querySelectorAll(".parede")) {
        const rectParede = parede.getBoundingClientRect();

        if (
            rectPersonagem.left < rectParede.right &&
            rectPersonagem.right > rectParede.left &&
            rectPersonagem.top < rectParede.bottom &&
            rectPersonagem.bottom > rectParede.top
        ) {
            return true; // Há colisão com a parede
        }
    }

    return false; // Sem colisão, pode mover
}
  
  
async function movimentarPersonagem1() {
    if (!movimentoPermitido) return;
    let moveu = false;
    let novaPosX = pos1.x;
    let novaPosY = pos1.y;

    if (teclasPersonagem1["w"] || teclasPersonagem1["W"]) {
        novaPosY = pos1.y - velocidadeP1;
        // Verifica se está dentro da tela E não colide com paredes
        if (novaPosY >= 0 && !verificarColisaoComParedes(personagem1, pos1.x, novaPosY)) {
            pos1.y = novaPosY;
            if (personagem1Img.classList.contains('batata')) {
                personagem1Img.src = "../assets/jp_poses/cima_batata.png";
            } else {
                personagem1Img.src = "../assets/jp_poses/cima.png";
            }
            moveu = true;
        }
    }

    if (teclasPersonagem1["s"] || teclasPersonagem1["S"]) {
        novaPosY = pos1.y + velocidadeP1;
        // Verifica se está dentro da tela E não colide com paredes
        if (novaPosY <= alturaTela - personagem1.clientHeight && !verificarColisaoComParedes(personagem1, pos1.x, novaPosY)) {
            pos1.y = novaPosY;
            if (personagem1Img.classList.contains('batata')) {
                personagem1Img.src = "../assets/jp_poses/baixo_batata.png";
            } else {
                personagem1Img.src = "../assets/jp_poses/baixo.png";
            }
            moveu = true;
        }
    }

    if (teclasPersonagem1["a"] || teclasPersonagem1["A"]) {
        novaPosX = pos1.x - velocidadeP1;
        // Verifica se está dentro da tela E não colide com paredes
        if (novaPosX >= 0 && !verificarColisaoComParedes(personagem1, novaPosX, pos1.y)) {
            pos1.x = novaPosX;
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
        novaPosX = pos1.x + velocidadeP1;
        // Verifica se está dentro da tela E não colide com paredes
        if (novaPosX <= larguraTela - personagem1.clientWidth && !verificarColisaoComParedes(personagem1, novaPosX, pos1.y)) {
            pos1.x = novaPosX;
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

async function movimentarPersonagem2() {
    if (!movimentoPermitido) return;
    let moveu = false;
    let novaPosX = pos2.x;
    let novaPosY = pos2.y;

    if (teclasPersonagem2["ArrowUp"]) {
        novaPosY = pos2.y - velocidadeP2;
        // Verifica se está dentro da tela E não colide com paredes
        if (novaPosY >= 0 && !verificarColisaoComParedes(personagem2, pos2.x, novaPosY)) {
            pos2.y = novaPosY;
            if (personagem2Img.classList.contains('batata')) {
                personagem2Img.src = "../assets/stalberg_poses/cima_batata.png";
            } else {
                personagem2Img.src = "../assets/stalberg_poses/cima.png";
            }
            moveu = true;
        }
    }

    if (teclasPersonagem2["ArrowDown"]) {
        novaPosY = pos2.y + velocidadeP2;
        // Verifica se está dentro da tela E não colide com paredes
        if (novaPosY <= alturaTela - personagem2.clientHeight && !verificarColisaoComParedes(personagem2, pos2.x, novaPosY)) {
            pos2.y = novaPosY;
            if (personagem2Img.classList.contains('batata')) {
                personagem2Img.src = "../assets/stalberg_poses/baixo_batata.png";
            } else {
                personagem2Img.src = "../assets/stalberg_poses/baixo.png";
            }
            moveu = true;
        }
    }

    if (teclasPersonagem2["ArrowLeft"]) {
        novaPosX = pos2.x - velocidadeP2;
        // Verifica se está dentro da tela E não colide com paredes
        if (novaPosX >= 0 && !verificarColisaoComParedes(personagem2, novaPosX, pos2.y)) {
            pos2.x = novaPosX;
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
        novaPosX = pos2.x + velocidadeP2;
        // Verifica se está dentro da tela E não colide com paredes
        if (novaPosX <= larguraTela - personagem2.clientWidth && !verificarColisaoComParedes(personagem2, novaPosX, pos2.y)) {
            pos2.x = novaPosX;
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
   
async function loopMovimento1() {
      if (!animacaoRodando1) return;
      movimentarPersonagem1();
      verificarColisaoComPowerUp();
      verificarColisaoComPowerUpAumenta();
      verificarColisaoComPowerUpDiminui();
      requestAnimationFrame(loopMovimento1);
  }
   
  async function loopMovimento2() {
      if (!animacaoRodando2) return;
      movimentarPersonagem2();
      verificarColisaoComPowerUp();
      verificarColisaoComPowerUpAumenta();
      verificarColisaoComPowerUpDiminui();
      requestAnimationFrame(loopMovimento2);
  }
   
  async function iniciarMovimento(personagem) {
      if (personagem === 1 && !animacaoRodando1) {
          animacaoRodando1 = true;
          requestAnimationFrame(loopMovimento1);
      }
      if (personagem === 2 && !animacaoRodando2) {
          animacaoRodando2 = true;
          requestAnimationFrame(loopMovimento2);
      }
  }
  
  //timer
  let time = 90
  
  async function montarCronometro(segundos) {
      const minutos = Math.floor(segundos / 60);
      const segundosRestantes = segundos % 60;
      return { minutos, segundos: segundosRestantes };
  } 
  
  async function atualizarCronometro() {
      const { minutos, segundos } = montarCronometro(time);
      document.getElementById("minutos").textContent = String(minutos).padStart(2, '0');
      document.getElementById("segundos").textContent = String(segundos).padStart(2, '0');
  }
  
  async function iniciarCronometro() {
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
  async function gerarPowerUpAumenta() {
    let powerUp = document.getElementById("powerUpAumenta");
    powerUp.style.display = "none";
    
    const intervalo = Math.floor(Math.random() * (15000 - 40000 + 1)) + 15000; // 15 a 40 segundos
    
    setTimeout(() => {
        const { x, y } = gerarPosicaoValida();
        powerUp.style.left = `${x}px`;
        powerUp.style.top = `${y}px`;
        powerUp.style.display = "block";
    }, intervalo);
}
  
async function ativarPoderAumenta(personagem) {
    coin.play()
      if (personagem === 1) {
          time += 10
      }
   
      if (personagem === 2) {
          time +=10
      }
  }
  
  async function verificarColisaoComPowerUpAumenta() {
      let powerUp = document.getElementById("powerUpAumenta");
      let rectPowerUp = powerUp.getBoundingClientRect();
      let rectP1 = personagem1.getBoundingClientRect();
      let rectP2 = personagem2.getBoundingClientRect();
   
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
          }, 7000);
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
          }, 7000);
      }
  }
  
  async function gerarPowerUpDiminui() {
    let powerUp = document.getElementById("powerUpDiminui");
    powerUp.style.display = "none";
    
    const intervalo = Math.floor(Math.random() * (15000 - 40000 + 1)) + 15000; // 15 a 40 segundos
    
    setTimeout(() => {
        const { x, y } = gerarPosicaoValida();
        powerUp.style.left = `${x}px`;
        powerUp.style.top = `${y}px`;
        powerUp.style.display = "block";
    }, intervalo);
}
   
async function ativarPoderDiminui(personagem) {
    coin.play()
      if (personagem === 1) {
          time -= 10
      }
   
      if (personagem === 2) {
          time -= 10
      }
  }
  
  async function verificarColisaoComPowerUpDiminui() {
      let powerUp = document.getElementById("powerUpDiminui");
      let rectPowerUp = powerUp.getBoundingClientRect();
      let rectP1 = personagem1.getBoundingClientRect();
      let rectP2 = personagem2.getBoundingClientRect();
      let timeout = Math.floor(Math.random() * (20000 - 30000 + 1)) + 20000;
   
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
  
    gerarPowerUp();
    gerarPowerUpAumenta();
    gerarPowerUpDiminui();