import { Item } from "./item";

const color = health => {
  if (health < 100) return "#eee;";
  if (health < 500) return "#634";
  return "brown";
};

export class Wall extends Item {
  constructor(pos, size) {
    super(pos, size);
    this.health = 1000;
  }

  render(c) {
    c.beginPath();
    c.fillStyle = color(this.health);
    c.fillRect(this.pos[0], this.pos[1], this.size[0], this.size[1]);
    c.rect(this.pos[0], this.pos[1], this.size[0], this.size[1]);
    c.strokeStyle = "#eee";
    c.stroke();
    c.strokeStyle = "black";
  }
}
