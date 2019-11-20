import { Item } from "./item";

export class Bullet extends Item {
  constructor(pos, dir, ownerId) {
    super(pos, [2, 2]);
    this.dir = dir;
    this.v = 300;
    this.ownerId = ownerId;
    this.type = "bullet";
  }

  hitWall() {
    this.health = 0;
    this.v = 0;
  }
}
