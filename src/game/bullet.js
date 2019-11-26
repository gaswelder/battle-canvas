import { Item } from "./world/item";
import { Player } from "./player";

export class Bullet extends Item {
  constructor(pos, dir, ownerId, v, damage) {
    super(pos, [2, 2]);
    this.dir = dir;
    this.ownerId = ownerId;
    this.type = "bullet";
    this.v = v;
    this.damage = damage;
  }

  hitWall() {
    this.health = 0;
    this.v = 0;
  }

  hit(obj) {
    if (obj instanceof Player && obj.id == this.ownerId) {
      return;
    }
    obj.health -= this.damage;
    this.v = 0;
    this.health = 0;
  }
}
