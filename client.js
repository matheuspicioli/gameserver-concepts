const dgram = require("dgram");
const blessed = require("blessed");
const crypto = require("crypto");

const SERVER_PORT = 41234;
const SERVER_HOST = "127.0.0.1";

const socket = dgram.createSocket("udp4");
socket.bind();
const id = crypto.randomUUID();

const TICK_RATE = 20;
const input = { w: false, a: false, s: false, d: false };
let players = {};

/* =====================
   TERMINAL UI
===================== */
const screen = blessed.screen({
  smartCSR: true,
  title: "UDP Multiplayer"
});
screen.key(["q", "C-c"], () => process.exit(0));
screen.key("w", () => input.w = true);
screen.key("a", () => input.a = true);
screen.key("s", () => input.s = true);
screen.key("d", () => input.d = true);

const hud = blessed.box({
  top: 0,
  left: 0,
  height: 1,
  content: "WASD move | Q quit",
  style: { fg: "white" }
});
screen.append(hud);

const entitiesLayer = blessed.box({
  top: 1,
  left: 0,
  width: "100%",
  height: "100%"
});
screen.append(entitiesLayer);

/* =====================
   NETWORK
===================== */
socket.send(
  Buffer.from(JSON.stringify({ type: "join", id })),
  SERVER_PORT,
  SERVER_HOST
);
socket.on("message", msg => {
    const data = JSON.parse(msg.toString());
    players = data.players;
});

/* =====================
   GAME LOOP
===================== */
setInterval(() => {
  socket.send(
    Buffer.from(JSON.stringify({ type: "input", id, input })),
    SERVER_PORT,
    SERVER_HOST
  );

  input.w = input.a = input.s = input.d = false;
  render();
}, 1000 / TICK_RATE);

/* =====================
   RENDER
===================== */
function render() {
  entitiesLayer.children.forEach(c => c.detach());

  for (const [pid, p] of Object.entries(players)) {
    // Player is @ other's is O
    const char = pid === id ? "@" : "O";

    entitiesLayer.append(blessed.box({
      top: p.y,
      left: p.x,
      width: 1,
      height: 1,
      content: char,
      style: { fg: pid === id ? "green" : "yellow" }
    }));
  }

  screen.render();
}
