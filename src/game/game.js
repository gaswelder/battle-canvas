import { maze } from "./maze";
import { Player } from "./player";
import { World } from "./world/world";
import { WIDTH, HEIGHT, RENDER_FPS, RUN_FPS } from "./const";

export class Game {
  constructor(update) {
    this.world = new World(WIDTH, HEIGHT, maze(WIDTH, HEIGHT));
    this.update = update;
  }

  addPlayer(id) {
    const pos = [
      10 + (WIDTH - 20) * Math.random(),
      10 + (HEIGHT - 20) * Math.random()
    ];
    this.world.addObject(new Player(id, pos));
  }

  start() {
    this.update(this.world.objects);
    setInterval(() => this.update(this.world.objects), 1000 / RENDER_FPS);

    const dt = 1000 / RUN_FPS;
    setInterval(() => {
      this.world.run(dt);
    }, dt);
  }

  dispatchKey(playerId, action, pressed) {
    const player = this.world.objects.find(
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
