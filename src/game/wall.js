import { Item } from "./item";

export class Wall extends Item {
  constructor(pos, size) {
    super(pos, size);
    this.health = 1000;
  }
}
