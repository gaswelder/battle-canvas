const ws = require("ws");
const { Game } = require("../../build/game.bin");

exports.createServer = function createServer(server) {
  const wss = new ws.Server({ server });

  let id = 0;
  const sockets = new Set();

  const game = new Game(objects => {
    const update = JSON.stringify(objects);
    sockets.forEach(c => {
      c.send(update);
    });
  });
  game.start();

  wss.on("connection", function connection(ws) {
    sockets.add(ws);
    id++;
    ws.on("close", function() {
      sockets.delete(ws);
      game.removePlayer(id);
    });
    processSocket(ws, id);
  });

  function processSocket(ws, id) {
    game.addPlayer(id);
    ws.on("message", function incoming(message) {
      const msg = JSON.parse(message);
      process.stdout.write(`${id}\t${message}\n`);
      if (msg.action) {
        game.dispatchKey(id, msg.action, msg.pressed);
      }
    });
  }
};
