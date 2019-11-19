import { Item } from "./item";

export class Bullet extends Item {
  constructor(pos, dir) {
    super(pos, [2, 2]);
    this.dir = dir;
    this.v = 300;
  }

  hitWall() {
    console.log("kaboom");
    this.health = 0;
    this.v = 0;
  }
}
