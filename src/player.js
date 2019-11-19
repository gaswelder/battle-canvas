import { Bullet } from "./bullet";
import { Item } from "./item";

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
    switch (key) {
      case "ArrowUp":
        this.dir[1] = 1;
        break;
      case "ArrowDown":
        this.dir[1] = -1;
        break;
      case "ArrowLeft":
        this.dir[0] = -1;
        break;
      case "ArrowRight":
        this.dir[0] = 1;
        break;
      case " ":
        this.shooting = true;
        break;
    }
    if (this.dir[0] || this.dir[1]) {
      this.v = 60;
    } else {
      this.v = 0;
    }
  }

  remove(key) {
    switch (key) {
      case "ArrowUp":
      case "ArrowDown":
        this.dir[1] = 0;
        break;
      case "ArrowLeft":
      case "ArrowRight":
        this.dir[0] = 0;
        break;
      case " ":
        this.shooting = false;
        break;
    }
    if (this.dir[0] || this.dir[1]) {
      this.v = 60;
    } else {
      this.v = 0;
    }
  }

  run(dt, t) {
    const shootsPerSecond = 10;
    super.run(dt, t);
    if (this.shooting && t >= this.nextShoot) {
      this.nextShoot = t + 1000 / shootsPerSecond;
      return [new Bullet(this.pos.slice(), [1, 0])];
    }
  }
}
