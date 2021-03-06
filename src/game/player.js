import { Item } from "./world/item";
import { Weapon } from "./weapon";
import { PLAYER_SPEED } from "./const";

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

const SPACE = " ";

export class Player extends Item {
  constructor(id, pos) {
    super(pos, [16, 16]);
    this.keys = {
      ArrowUp: false,
      ArrowDown: false,
      ArrowLeft: false,
      ArrowRight: false,
      [SPACE]: false
    };
    this.id = id;
    this.weapon = new Weapon(this.id);
    this.type = "player";
  }

  add(key) {
    if (key == SPACE) {
      this.weapon.pullTrigger();
      return;
    }
    this.keys[key] = true;
    this.v = speed(this.keys);
    this.dir = dir(this.dir, this.keys);
  }

  remove(key) {
    if (key == SPACE) {
      this.weapon.releaseTrigger();
      return;
    }
    this.keys[key] = false;
    this.v = speed(this.keys);
    this.dir = dir(this.dir, this.keys);
  }

  tick(t) {
    super.tick(t);
    const center = [
      this.pos[0] + this.size[0] / 2,
      this.pos[1] + this.size[1] / 2
    ];
    if (this.dir[0] > 0) {
      center[0] += this.size[0];
    }
    if (this.dir[0] < 0) {
      center[0] -= this.size[0];
    }
    if (this.dir[1] > 0) {
      center[1] += this.size[1];
    }
    if (this.dir[1] < 0) {
      center[1] -= this.size[1];
    }
    return this.weapon.run(t, center, this.dir);
  }
}
