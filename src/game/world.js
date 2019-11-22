import { Bullet } from "./bullet";
import { Tree } from "./tree";
import { Wall } from "./wall";

const KMPH_TO_PXPMS = 0.001;

const intersects = (obj1, obj2) =>
  points(obj2).some(p => rectHas(obj1, p)) ||
  points(obj1).some(p => rectHas(obj2, p));
const points = obj => [
  [obj.pos[0], obj.pos[1]],
  [obj.pos[0] + obj.size[0], obj.pos[1] + obj.size[1]],
  [obj.pos[0] + obj.size[0], obj.pos[1]],
  [obj.pos[0], obj.pos[1] + obj.size[1]]
];
const rectHas = (obj, p) =>
  p[0] > obj.pos[0] &&
  p[0] < obj.pos[0] + obj.size[0] &&
  p[1] > obj.pos[1] &&
  p[1] < obj.pos[1] + obj.size[1];

export class World {
  constructor(width, height, objects, t) {
    this.objects = objects;
    this.t = t;
    this.width = width;
    this.height = height;
  }

  addObject(obj) {
    this.objects.push(obj);
  }

  gc() {
    let n = this.objects.length;
    for (let i = 0; i < n; i++) {
      if (this.objects[i].health <= 0) {
        this.objects.splice(i, 1);
        i--;
        n--;
      }
    }
  }

  clip() {
    for (const obj of this.objects) {
      // No need to check static objects.
      if (obj instanceof Wall || obj instanceof Tree) continue;

      if (obj.pos[0] + obj.size[0] > this.width) {
        obj.pos[0] = this.width - obj.size[0];
        obj.hitWall();
      }
      if (obj.pos[0] < 0) {
        obj.pos[0] = 0;
        obj.hitWall();
      }
      if (obj.pos[1] + obj.size[1] > this.height) {
        obj.pos[1] = this.height - obj.size[1];
        obj.hitWall();
      }
      if (obj.pos[1] < 0) {
        obj.pos[1] = 0;
        obj.hitWall();
      }
    }
  }

  checkHits() {
    const bullets = this.objects.filter(o => o instanceof Bullet);
    const rest = this.objects.filter(o => !(o instanceof Bullet));

    for (const obj of rest) {
      for (const bul of bullets) {
        if (intersects(obj, bul)) {
          obj.punch(bul);
        }
      }
    }
  }

  clipObjects(dt) {
    const n = this.objects.length;
    for (let i = 0; i < n; i++) {
      const a = this.objects[i];
      if (a instanceof Bullet) continue;
      for (let j = i + 1; j < n; j++) {
        const b = this.objects[j];
        if (b instanceof Bullet) continue;
        if (intersects(a, b)) {
          // Cancel previous movement
          a.pos[0] -= a.v * KMPH_TO_PXPMS * a.dir[0] * dt;
          b.pos[0] -= b.v * KMPH_TO_PXPMS * b.dir[0] * dt;
          a.pos[1] -= a.v * KMPH_TO_PXPMS * a.dir[1] * dt;
          b.pos[1] -= b.v * KMPH_TO_PXPMS * b.dir[1] * dt;
        }
      }
    }
  }

  run(t) {
    const dt = t - this.t;

    const newObjects = this.move(dt, t);
    for (const n of newObjects) {
      this.objects.push(n);
    }
    this.clip();
    this.checkHits();
    this.clipObjects(dt);
    this.gc();
    this.t = t;
  }

  move(dt, t2) {
    let more = [];
    for (const o of this.objects) {
      if (o instanceof Wall || o instanceof Tree) continue;
      const newObjects = o.run(dt, t2);

      const v = o.v * KMPH_TO_PXPMS;
      o.pos[0] += o.dir[0] * v * dt;
      o.pos[1] += o.dir[1] * v * dt;

      if (newObjects) {
        for (const n of newObjects) {
          more.push(n);
        }
      }
    }
    return more;
  }
}
