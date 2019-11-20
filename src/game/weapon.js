import { Bullet } from "./bullet";

export class Weapon {
  constructor(ownerId) {
    this.nextShoot = 0;
    this.shootsPerSecond = 10;
    this.ownerId = ownerId;
  }

  run(t, center, dir) {
    if (t < this.nextShoot) return [];
    this.nextShoot = t + 1000 / this.shootsPerSecond;
    return [new Bullet(center, dir.slice(), this.ownerId)];
  }
}
