# 🥔 Too Hot To Handle - Jogo Multiplayer em JavaScript

**Too Hot To Handle** é um jogo multiplayer divertido e competitivo de **Batata Quente**, desenvolvido em **HTML, CSS e JavaScript**. Dois jogadores controlam personagens que se movem pela tela, passando uma batata quente entre si. Quem estiver com a batata quando o tempo acabar... explode! 🧨

[🔗 Acesse o jogo hospedado no Render](https://too-hot-to-handle-john-vs-berger.onrender.com/)

---

## Como Rodar o Jogo Localmente

1. **Clone o repositório**:
   ```bash
   git clone <URL_DO_REPOSITORIO>

2. **Navegue para o diretório do projeto**:
   ```bash
   cd TooHotToHandle

3. **Inicie o Live Server**:
Certifique-se de que o arquivo `index.html` está localizado no diretório raiz do projeto. Abra o diretório no seu editor de código (como o VS Code) e clique com o botão direito no arquivo `index.html`. Escolha a opção "**Open with Live Server**".

Caso não tenha o **Live Server** instalado, siga os passos abaixo:

- Instale a extensão Live Server no Visual Studio Code.

- Reinicie o editor, se necessário.

Agora, repita o processo de abrir o `index.html` com o **Live Server**.

## Como Jogar
Controle dos personagens:
<br>**Jogador 1:** Use as teclas W, A, S, D.

**Jogador 2**: Use as setas do teclado (↑, ↓, ←, →).

**Objetivo do jogo:**
<br>Evite a batata quente e faça o outro jogador explodir!

## Mecânicas do Jogo
1️⃣ Passar a Batata
<br>A batata é passada de um jogador para o outro ao colidirem.

2️⃣ Explosão
<br>O jogador que segurar a batata por muito tempo explode, e o outro vence a rodada.

3️⃣ Power-ups
<br>Aparecem aleatoriamente no mapa e aumentam temporariamente a velocidade do jogador que os coleta e aumentam e diminuem o tempo do jogo.

4️⃣ Obstáculos
<br>O jogo pode conter paredes com a classe .parede, que bloqueiam a movimentação dos personagens.

5️⃣ Mudança de Pose
<br>Quando o personagem para de se mover, sua pose muda para indicar inatividade.

## Informações Técnicas
**Frontend**: Desenvolvido com HTML, CSS e JavaScript puro.

**Renderização:** O jogo utiliza o DOM para renderizar elementos.

**Multiplayer Local:** Ambos os jogadores compartilham o teclado.
