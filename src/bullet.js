import { Item } from "./item";

export class Bullet extends Item {
  constructor(pos, dir) {
    super(pos, [2, 2]);
    this.dir = dir;
    this.v = 300;
  }
}
