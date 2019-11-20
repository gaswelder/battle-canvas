const http = require("http");
const ws = require("ws");
const fs = require("fs");
const util = require("util");
const { Game } = require("../build/game.bin");

const readFile = util.promisify(fs.readFile);

const staticFiles = {
  "/": "../index.html",
  "/ui.js": "../build/ui.bin.js"
};
function serveFile(res, localPath) {
  readFile(__dirname + "/" + localPath)
    .then(src => res.write(src))
    .catch(err => res.write(err.toString()))
    .then(() => res.end());
}

function main() {
  const server = http.createServer(function(req, res) {
    if (req.url in staticFiles) {
      serveFile(res, staticFiles[req.url]);
      return;
    }
    res.write("Nothing");
    res.end();
  });

  const wss = new ws.Server({ server });

  let id = 0;

  const sockets = [];
  function add(ws) {
    sockets.push({ ws });
  }
  function remove(ws) {
    const pos = sockets.findIndex(s => s.ws == ws);
    sockets.splice(pos, 1);
  }

  const game = new Game(objects => {
    sockets.forEach(c => c.ws.send(JSON.stringify(objects)));
  });
  game.start();

  wss.on("connection", function connection(ws) {
    add(ws);
    ws.on("close", function() {
      remove(ws);
    });
    id++;
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
      // handlers[msg.type](msg.val);
    });
  }

  server.listen(process.env.PORT || 8080);
}

main();
