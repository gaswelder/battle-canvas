import { Wall } from "../game/wall";

export function createRenderer(container) {
  container.innerHTML = '<canvas width="800" height="600" />';
  const canvas = document.querySelector("canvas");

  const c = canvas.getContext("2d");
  c.translate(0, canvas.height);
  c.scale(1, -1);

  function render(objects) {
    c.fillStyle = "#fff";
    c.beginPath();
    c.fillRect(0, 0, 800, 600);

    for (const o of objects) {
      renderObject(c, o);
    }
  }

  const wallColor = health => {
    if (health < 100) return "#eee;";
    if (health < 500) return "#634";
    return "brown";
  };

  function renderObject(c, object) {
    if (object instanceof Wall) {
      c.beginPath();
      c.fillStyle = wallColor(object.health);
      c.fillRect(object.pos[0], object.pos[1], object.size[0], object.size[1]);
      c.rect(object.pos[0], object.pos[1], object.size[0], object.size[1]);
      c.strokeStyle = "#eee";
      c.stroke();
      c.strokeStyle = "black";
    } else {
      c.beginPath();
      // c.strokeStyle = "1px solid red;";
      c.rect(object.pos[0], object.pos[1], object.size[0], object.size[1]);
      c.stroke();
    }
  }

  return render;
}
