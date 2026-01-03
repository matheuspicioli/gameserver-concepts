# 🎥 **Demo video:**  
https://github.com/user-attachments/assets/828e4940-019c-4c41-887e-32f2b08778e1

# 🎮 UDP Multiplayer Terminal Game (Learning Project)

## 📌 Overview

This is a **simple multiplayer game prototype** built with **Node.js and UDP**, rendered in the **terminal using Blessed**.

I am **not a game developer** — I'm a **backend/software developer** curious about how real-time systems work.  
This project was created as a learning exercise, and if you're interested in my professional background, feel free to check my [LinkedIn](https://www.linkedin.com/in/matheuspicioli/) and [GitHub](https://github.com/matheuspicioli).

The main goal of this project is **learning**.
It was built out of curiosity to better understand **how real-time FPS games (like CS2 and Valorant) work internally**, especially regarding networking and game servers.

---

## 🧠 Motivation

I've always been curious about **how FPS games update player positions so quickly**, how servers manage multiple players in real time, and how latency is handled without breaking gameplay.

To explore this, I decided to:

- Avoid HTTP and WebSockets - just after known why games avoid TCP packet to real-time
- Use **raw UDP**
- Build a **minimal authoritative game server**
- Render everything in the **terminal**, keeping the system observable and simple

This project helped me understand:

- Why FPS games prefer UDP
- How the server owns the game state
- How clients send only *intent* (inputs)
- Why rendering and networking are separate problems

---

## 🏗️ Architecture

### Server
- Node.js UDP server (`dgram`)
- Authoritative game state
- Receives player inputs
- Updates positions
- Broadcasts full state to all connected clients

### Client
- Node.js UDP client
- Terminal UI using `blessed`
- Sends movement input (WASD)
- Renders the game state received from the server

---

## 🎮 Controls

- `W`, `A`, `S`, `D` → Move player
- `Q` or `Ctrl + C` → Quit

Player representation:
- `@` → Your player
- `O` → Other players

---

## 🚀 How to Run

### 1️⃣ Install dependencies

```bash
npm install
```

### 2️⃣ Start the server

```bash
node server.js
```

### 3️⃣ Start one or more clients (in separate terminals)

```bash
node client.js
```

---

## ⚠️ Important Notes

* No authentication, encryption, or security layer
* **Obviously** it isn't production-ready
* UDP is unreliable and unordered by design
* Rendering is intentionally minimal
* All of these choices were made to simplify learning.

---

## 🔮 Possible Next Steps

This project can be extended to explore more advanced FPS concepts, such as:

* Client-side prediction
* Server reconciliation
* Interpolation and extrapolation
* Packet loss simulation
* Binary protocols - improve performance between packets
* Tick-rate optimization - deep research about it

---

## 📚 Final Thoughts

This project exists purely as a learning exercise.

By building everything from scratch, it becomes much easier to understand why real FPS architectures are designed the way they are, and what problems they are actually solving.

# [PT-BR]
# 🎮 Jogo Multiplayer UDP em Terminal (Projeto de Estudo)

## 📌 Visão Geral

Este é um protótipo simples de jogo multiplayer construído com Node.js e UDP, renderizado no terminal usando Blessed.

Eu não sou desenvolvedor de jogos — sou um desenvolvedor backend/software curioso sobre como sistemas em tempo real funcionam.
Este projeto foi criado como um exercício de aprendizado e, se quiser conhecer mais sobre meu perfil profissional, fique à vontade para visitar meu [LinkedIn](https://www.linkedin.com/in/matheuspicioli/) e [GitHub](https://github.com/matheuspicioli).

O principal objetivo deste projeto é aprendizado, não uso em produção.
Ele surgiu da curiosidade em entender como jogos FPS em tempo real (como CS2 e Valorant) funcionam internamente, especialmente do ponto de vista de rede e servidores.

---

## 🧠 Motivação

Sempre tive curiosidade sobre como jogos FPS conseguem atualizar posições tão rapidamente, como servidores lidam com vários jogadores simultaneamente e como a latência é tratada.

Para estudar isso, decidi:

* Não usar HTTP ou WebSockets
* Utilizar 'raw' UDP
* Criar um servidor autoritativo
* Renderizar tudo no terminal, mantendo o projeto simples e observável

Este projeto ajudou a entender:

* Por que FPS usam UDP
* Como o servidor controla o estado do jogo
* Como o cliente envia apenas intenção (inputs)
* A separação entre rede e renderização

---

## 🏗️ Arquitetura

### Servidor

* Servidor UDP em Node.js (dgram)
* Estado do jogo autoritativo
* Recebe inputs dos jogadores
* Atualiza posições
* Envia o estado completo aos clientes

### Cliente

* Cliente UDP em Node.js
* Interface no terminal usando blessed
* Envia movimentos (WASD)
* Renderiza o estado recebido do servidor

🎮 Controles

* W, A, S, D → Movimentar
* Q ou Ctrl + C → Sair

---

## Representação:

@ → Seu jogador

O → Outros jogadores

---

## 🚀 Como Executar

1️⃣ Instalar dependências

```bash
npm install
```

2️⃣ Iniciar o servidor

```bash
node server.js
```

3️⃣ Iniciar um ou mais clientes (em terminais separados)

```bash
node client.js
```

---

## ⚠️ Observações Importantes

* Não há segurança, autenticação ou anti-cheat
* **Obviamente** não é um projeto pronto para produção
* UDP não garante ordem nem entrega
* Renderização propositalmente simples

---

## 🔮 Próximos Passos Possíveis

Este projeto pode evoluir para estudar conceitos mais avançados de FPS, como:

* Client-side prediction
* Server reconciliation
* Interpolação e extrapolação
* Simulação de perda de pacotes
* Protocolos binários
* Múltiplos servidores de partidas
* Otimização de tick-rate

---

## 📚 Considerações Finais

Este projeto existe puramente como um exercício de aprendizado.

Construir tudo do zero ajuda a entender claramente por que arquiteturas reais de FPS funcionam da forma que funcionam, e quais problemas elas resolvem.
