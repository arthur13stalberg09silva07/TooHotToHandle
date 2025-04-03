let vencedor = localStorage.getItem("vencedor");
const imagemVencedor = document.getElementById("winnerImg")
const imagemPerdedor = document.getElementById("loserImg")
const feliz = new Audio('../audios/feliz.mp3');

feliz.play()
imagemVencedor.style.display = "none"
imagemPerdedor.style.display = "none"
if(vencedor == 2){
    const imagemVencedor = document.getElementById("winnerImg")
    const imagemPerdedor = document.getElementById("loserImg")
    imagemVencedor.src = "../images/stalGanhador.png"
    imagemPerdedor.src = "../images/joaoPerdedor.png"
    imagemVencedor.style.display = "block"
    imagemPerdedor.style.display = "block"
}
imagemVencedor.style.display = "block"
imagemPerdedor.style.display = "block"

const btReiniciar = document.getElementsByClassName("btPlayAgain")
const btSair = document.getElementsByClassName("sair")

function reiniciar() {
    window.location.href = "index.html";
}

function sair() {
    window.location.href = "main.html";
}