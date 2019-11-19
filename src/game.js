import { Item } from "./item";
import { Player } from "./player";
import { Bullet } from "./bullet";

const RUN_FPS = 20;

export class Game {
  constructor() {
    this.objects = [
      new Item([0, 0]),
      new Item([200, 100]),
      new Item([100, 333]),
      new Item([123, 352]),
      new Item([400, 211]),
      new Player()
    ];
    this.t = Date.now();
  }

  start(callback) {
    callback(this.objects);

    const move = (dt, t2) => {
      let more = [];
      for (const o of this.objects) {
        const newObjects = o.run(dt, t2);
        if (newObjects) {
          for (const n of newObjects) {
            more.push(n);
          }
        }
      }
      return more;
    };

    const WIDTH = 800;
    const HEIGHT = 600;

    const clip = () => {
      for (const obj of this.objects) {
        if (obj.pos[0] + obj.size[0] > WIDTH) {
          obj.pos[0] = WIDTH - obj.size[0];
          obj.hitWall();
        }
        if (obj.pos[0] < 0) {
          obj.pos[0] = 0;
          obj.hitWall();
        }
        if (obj.pos[1] + obj.size[1] > HEIGHT) {
          obj.pos[1] = HEIGHT - obj.size[1];
          obj.hitWall();
        }
        if (obj.pos[1] < 0) {
          obj.pos[1] = 0;
          obj.hitWall();
        }
      }
    };

    const gc = () => {
      let n = this.objects.length;
      for (let i = 0; i < n; i++) {
        if (this.objects[i].health <= 0) {
          this.objects.splice(i, 1);
          i--;
          n--;
        }
      }
    };

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
      p[0] >= obj.pos[0] &&
      p[0] <= obj.pos[0] + obj.size[0] &&
      p[1] >= obj.pos[1] &&
      p[1] <= obj.pos[1] + obj.size[1];

    const checkHits = () => {
      const bullets = this.objects.filter(o => o instanceof Bullet);
      const rest = this.objects.filter(o => !(o instanceof Bullet));

      for (const obj of rest) {
        for (const bul of bullets) {
          if (intersects(obj, bul)) {
            obj.punch(bul);
          }
        }
      }
    };

    const run = () => {
      const t2 = Date.now();
      const dt = t2 - this.t;

      const newObjects = move(dt, t2);
      for (const n of newObjects) {
        this.objects.push(n);
      }
      clip();
      checkHits();
      gc();
      this.t += dt;
    };
    run();
    setInterval(run, 1000 / RUN_FPS);
  }

  dispatchKey(key, pressed) {
    const keys = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " "];
    if (!keys.includes(key)) {
      return false;
    }
    const player = this.objects.find(o => o instanceof Player);
    if (pressed) {
      player.add(key);
    } else {
      player.remove(key);
    }
    return true;
  }
}
