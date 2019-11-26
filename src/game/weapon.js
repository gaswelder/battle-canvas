import { Bullet } from "./bullet";

const kind = {
  shootsPerSecond: 10,
  automatic: true,
  v0: 300,
  damage: 300
};

export class Weapon {
  constructor(ownerId) {
    this.ownerId = ownerId;
    this.kind = kind;
    this.nextShoot = 0;
    this.triggerOn = false;
    this.bulletsFired = 0;
  }

  pullTrigger() {
    this.triggerOn = true;
  }

  releaseTrigger() {
    this.triggerOn = false;
    this.bulletsFired = 0;
  }

  run(t, center, dir) {
    if (!this.triggerOn || t < this.nextShoot) return [];
    if (!this.kind.automatic && this.bulletsFired > 0) return [];

    this.bulletsFired++;
    this.nextShoot = t + 1000 / this.kind.shootsPerSecond;
    return [
      new Bullet(
        center,
        dir.slice(),
        this.ownerId,
        this.kind.v0,
        this.kind.damage
      )
    ];
  }
}
