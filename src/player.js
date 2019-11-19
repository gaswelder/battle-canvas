import { Bullet } from "./bullet";
import { Item } from "./item";

const speed = keys =>
  keys.ArrowDown || keys.ArrowLeft || keys.ArrowRight || keys.ArrowUp ? 60 : 0;

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
  constructor() {
    super([400, 400], [16, 16]);
    this.keys = {
      ArrowUp: false,
      ArrowDown: false,
      ArrowLeft: false,
      ArrowRight: false,
      " ": false
    };
    this.nextShoot = Date.now();
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
    const shootsPerSecond = 10;
    super.run(dt, t);
    if (this.keys[" "] && t >= this.nextShoot) {
      this.nextShoot = t + 1000 / shootsPerSecond;
      const bulletPos = [
        this.pos[0] + this.size[0] / 2,
        this.pos[1] + this.size[1] / 2
      ];
      return [new Bullet(bulletPos, this.dir.slice())];
    }
  }
}
