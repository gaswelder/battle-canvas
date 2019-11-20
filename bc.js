import { Game } from "./src/game";

const container = document.getElementById("ttt");
container.innerHTML = '<canvas width="800" height="600" />';
container.tabIndex = 0;
const canvas = document.querySelector("canvas");

const c = canvas.getContext("2d");
c.translate(0, canvas.height);
c.scale(1, -1);

function render(objects) {
  c.fillStyle = "#fff";
  c.beginPath();
  c.fillRect(0, 0, 800, 600);

  for (const o of objects) {
    o.render(c);
  }
}
const game = new Game(render);
game.start();

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
