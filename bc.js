import { Game } from "./src/game/game";
import { createRenderer } from "./src/ui/render";
import { setControls } from "./src/ui/controls";

const container = document.getElementById("ttt");
container.tabIndex = 0;

const game = new Game(createRenderer(container));
game.addPlayer(1);
game.addPlayer(2);
game.start();

setControls(
  1,
  ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " "],
  container,
  game
);
setControls(2, ["w", "s", "a", "d", "Enter"], container, game);
