const http = require("http");
const fs = require("fs");
const util = require("util");
const { createServer } = require("./server");

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

const server = http.createServer(function(req, res) {
  if (req.url in staticFiles) {
    serveFile(res, staticFiles[req.url]);
    return;
  }
  res.write("Nothing");
  res.end();
});
createServer(server);
server.listen(process.env.PORT || 8080);
