import { Game } from "./src/game";

const container = document.getElementById("ttt");
container.innerHTML = '<canvas width="800" height="600" />';
container.tabIndex = 0;
const canvas = document.querySelector("canvas");

let objects = [];
const game = new Game();
game.start(oo => {
  objects = oo;
});

const c = canvas.getContext("2d");
c.translate(0, canvas.height);
c.scale(1, -1);

function render() {
  c.fillStyle = "#fff";
  c.beginPath();
  c.fillRect(0, 0, 800, 600);

  for (const o of objects) {
    o.render(c);
  }
}

const RENDER_FPS = 20;
setInterval(render, 1000 / RENDER_FPS);

container.addEventListener("keydown", e => {
  if (game.dispatchKey(e.key, true)) {
    e.preventDefault();
  }
});
container.addEventListener("keyup", e => {
  if (game.dispatchKey(e.key, false)) {
    e.preventDefault();
  }
});
