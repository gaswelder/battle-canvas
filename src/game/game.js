import { Player } from "./player";
import { Bullet } from "./bullet";
import { terrain } from "./map";
import { maze } from "./maze";

const RUN_FPS = 20;
const WIDTH = 800;
const HEIGHT = 600;
const KMPH_TO_PXPMS = 0.001;
const RENDER_FPS = 20;

export class Game {
  constructor(update) {
    this.objects = maze(WIDTH, HEIGHT).concat(terrain(WIDTH, HEIGHT));
    this.t = Date.now();
    this.update = update;
  }

  addPlayer(id) {
    const pos = [
      10 + (WIDTH - 20) * Math.random(),
      10 + (HEIGHT - 20) * Math.random()
    ];
    this.objects.push(new Player(id, pos));
  }

  start() {
    this.update(this.objects);
    setInterval(() => this.update(this.objects), 1000 / RENDER_FPS);

    const move = (dt, t2) => {
      let more = [];
      for (const o of this.objects) {
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
    };

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
      p[0] > obj.pos[0] &&
      p[0] < obj.pos[0] + obj.size[0] &&
      p[1] > obj.pos[1] &&
      p[1] < obj.pos[1] + obj.size[1];

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

    const clipObjects = dt => {
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
      clipObjects(dt);
      gc();
      this.t += dt;
    };
    run();
    setInterval(run, 1000 / RUN_FPS);
  }

  dispatchKey(playerId, action, pressed) {
    const player = this.objects.find(
      o => o instanceof Player && o.id == playerId
    );
    if (!player) return;
    if (pressed) {
      player.add(action);
    } else {
      player.remove(action);
    }
  }
}
