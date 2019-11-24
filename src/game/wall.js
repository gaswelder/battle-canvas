import { Item } from "./world/item";

export class Wall extends Item {
  constructor(pos, size) {
    super(pos, size);
    this.health = 1000;
    this.type = "wall";
  }
}
