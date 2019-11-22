import { Wall } from "./wall";
import { rand, quant } from "./lib";

const WALL_SIZE = 20;

export function maze(width, height) {
  return split([0, 0, width, height]);
}

function split(area) {
  // split area recursively until area size is small enough

  if (size(area) <= 3 * WALL_SIZE) {
    return [];
  }
  const [a1, a2, walls] = randomSplit(area);
  return [...walls, ...split(a1), ...split(a2)];
}

function size(area) {
  const [x1, y1, x2, y2] = area;
  return Math.min(x2 - x1, y2 - y1);
}

function randomSplit(area) {
  const [x1, y1, x2, y2] = area;
  const wx = quant(20, rand(x1 + WALL_SIZE, x2 - 2 * WALL_SIZE));
  const wy = quant(20, rand(y1 + WALL_SIZE, y2 - 2 * WALL_SIZE));
  let a1, a2;
  let walls = [];

  if (rand(0, 1)) {
    // put walls from left to right
    for (let x = x1; x <= x2; x += WALL_SIZE) {
      if (rand(1, 10) < 3) continue;
      walls.push(new Wall([x, wy], [WALL_SIZE, WALL_SIZE]));
    }
    a1 = [x1, y1, x2, wy];
    a2 = [x1, wy + WALL_SIZE, x2, y2];
  } else {
    // put walls from top to bottom
    for (let y = y1; y <= y2; y += WALL_SIZE) {
      if (rand(1, 10) < 3) continue;
      walls.push(new Wall([wx, y], [WALL_SIZE, WALL_SIZE]));
    }
    a1 = [x1, y1, wx, y2];
    a2 = [wx + WALL_SIZE, y1, x2, y2];
  }
  return [a1, a2, walls];
}
