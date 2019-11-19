import { Item } from "./item";
import { Player } from "./player";

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
    const run = () => {
      const t2 = Date.now();
      const dt = t2 - this.t;

      let more = [];
      for (const o of this.objects) {
        const newObjects = o.run(dt, t2);
        if (newObjects) {
          for (const n of newObjects) {
            more.push(n);
          }
        }
      }
      for (const n of more) {
        this.objects.push(n);
      }

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
