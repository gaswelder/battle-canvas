import { Item } from "./world/item";

export class Tree extends Item {
  constructor(pos, size = [10, 10]) {
    super(pos, size);
    this.health = 10;
    this.type = "tree";
  }
}
