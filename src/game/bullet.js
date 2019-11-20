import { Item } from "./item";

export class Bullet extends Item {
  constructor(pos, dir, creator) {
    super(pos, [2, 2]);
    this.dir = dir;
    this.v = 300;
    this.creator = creator;
    this.type = "bullet";
  }

  hitWall() {
    this.health = 0;
    this.v = 0;
  }
}
