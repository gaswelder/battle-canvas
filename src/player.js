import { Item } from "./item";
import { Weapon } from "./weapon";

const PLAYER_SPEED = 100;

const speed = keys =>
  keys.ArrowDown || keys.ArrowLeft || keys.ArrowRight || keys.ArrowUp
    ? PLAYER_SPEED
    : 0;

const dir = (dir, keys) => {
  if (speed(keys) == 0) {
    return dir;
  }
  const result = [0, 0];
  if (keys.ArrowDown) result[1] = -1;
  if (keys.ArrowUp) result[1] = 1;
  if (keys.ArrowLeft) result[0] = -1;
  if (keys.ArrowRight) result[0] = 1;
  return result;
};

export class Player extends Item {
  constructor(id, pos) {
    super(pos, [16, 16]);
    this.keys = {
      ArrowUp: false,
      ArrowDown: false,
      ArrowLeft: false,
      ArrowRight: false,
      " ": false
    };
    this.weapon = new Weapon(this);
    this.id = id;
  }

  add(key) {
    this.keys[key] = true;
    this.v = speed(this.keys);
    this.dir = dir(this.dir, this.keys);
  }

  remove(key) {
    this.keys[key] = false;
    this.v = speed(this.keys);
    this.dir = dir(this.dir, this.keys);
  }

  run(dt, t) {
    super.run(dt, t);
    if (this.keys[" "]) {
      const center = [
        this.pos[0] + this.size[0] / 2,
        this.pos[1] + this.size[1] / 2
      ];
      return this.weapon.run(t, center, this.dir);
    }
  }
}
