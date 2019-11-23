const WIDTH = 1100;
const HEIGHT = 900;
export function createRenderer(container) {
  container.innerHTML = `<canvas width="${WIDTH}" height="${HEIGHT}" />`;
  const canvas = document.querySelector("canvas");

  const c = canvas.getContext("2d");
  c.translate(0, canvas.height);
  c.scale(1, -1);

  function render(objects) {
    c.fillStyle = "#fff";
    c.beginPath();
    c.fillRect(0, 0, WIDTH, HEIGHT);

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
    switch (object.type) {
      case "wall":
        c.beginPath();
        c.fillStyle = wallColor(object.health);
        c.fillRect(
          object.pos[0],
          object.pos[1],
          object.size[0],
          object.size[1]
        );
        c.rect(object.pos[0], object.pos[1], object.size[0], object.size[1]);
        c.strokeStyle = "#eee";
        c.stroke();
        c.strokeStyle = "black";
        break;
      case "tree":
        c.beginPath();
        c.fillStyle = "#090";
        c.fillRect(
          object.pos[0],
          object.pos[1],
          object.size[0],
          object.size[1]
        );
        break;
      default:
        c.beginPath();
        // c.strokeStyle = "1px solid red;";
        c.rect(object.pos[0], object.pos[1], object.size[0], object.size[1]);
        c.stroke();
    }
  }

  return render;
}
