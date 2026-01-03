const dgram = require("dgram");
const server = dgram.createSocket("udp4");

const PORT = 41234;
const TICK_RATE = 20;
const players = {};
const clients = new Map();

server.on("message", (msg, rinfo) => {
  const data = JSON.parse(msg.toString());

  // Track client address
  clients.set(data.id, rinfo);

  if (data.type === "join") {
    if (!players[data.id]) {
      players[data.id] = {
        x: Math.floor(Math.random() * 40),
        y: Math.floor(Math.random() * 15)
      };
      console.log("Player joined:", data.id);
    }
  }

  // Update location
  if (data.type === "input") {
    const p = players[data.id];
    if (!p) return;

    if (data.input.w) p.y--;
    if (data.input.s) p.y++;
    if (data.input.a) p.x--;
    if (data.input.d) p.x++;

    p.x = Math.max(0, Math.min(80, p.x));
    p.y = Math.max(1, Math.min(24, p.y));
  }
});

/* =====================
   GAME LOOP
   Here is where we keep the clients updated
   based on a tick rate
===================== */
setInterval(() => {
  const payload = Buffer.from(JSON.stringify({ players }));

  for (const rinfo of clients.values()) {
    server.send(payload, rinfo.port, rinfo.address);
  }
}, 1000 / TICK_RATE);

server.bind(PORT, () => {
  console.log("UDP server running on", PORT);
});
