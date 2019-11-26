import { Tree } from "../tree";
import { Wall } from "../wall";

const KMPH_TO_PXPMS = 0.001;

function miss(obj1, obj2) {
  const aLeft = obj1.pos[0];
  const aRight = obj1.pos[0] + obj1.size[0];
  const aBottom = obj1.pos[1];
  const aTop = obj1.pos[1] + obj1.size[1];

  const bLeft = obj2.pos[0];
  const bRight = obj2.pos[0] + obj2.size[0];
  const bBottom = obj2.pos[1];
  const bTop = obj2.pos[1] + obj2.size[1];

  return aRight < bLeft || aLeft > bRight || aTop < bBottom || aBottom > bTop;
}

function intersects(obj1, obj2) {
  return !miss(obj1, obj2);
}

export class World {
  constructor(width, height, objects) {
    this.objects = objects;
    this.t = 0;
    this.width = width;
    this.height = height;
  }

  addObject(obj) {
    this.objects.push(obj);
  }

  removeObject(id) {
    const pos = this.objects.findIndex(o => o.id == id);
    if (pos < 0) return;
    this.objects.splice(pos, 1);
  }

  /**
   * Advances the state of the world by the given amount
   * of time.
   *
   * @param {number} dt milliseconds
   */
  run(dt) {
    const t = this.t + dt;

    // Let each object tick.
    const newObjects = [];
    for (const o of this.objects) {
      const more = o.tick(t);
      if (more) {
        for (const m of more) {
          newObjects.push(m);
        }
      }
    }
    for (const n of newObjects) {
      this.objects.push(n);
    }

    // Move each object.
    for (const o of this.objects) {
      if (!o.v) continue;
      const v = o.v * KMPH_TO_PXPMS;
      o.pos[0] += o.dir[0] * v * dt;
      o.pos[1] += o.dir[1] * v * dt;

      const hit = this.objects.find(o1 => o1 != o && intersects(o1, o));
      if (hit) {
        const v = o.v * KMPH_TO_PXPMS;
        o.pos[0] -= o.dir[0] * v * dt;
        o.pos[1] -= o.dir[1] * v * dt;
        o.hit(hit);
        hit.hit(o);
      }
    }

    this.clip();
    this.gc();
    this.t = t;
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
}
