import { Wall } from "./wall";
import { quant } from "./lib";

export const terrain = (width, height) => {
  const objects = [];
  const a = Math.random() * 0.02;
  const b = Math.random() * 2;
  const c = Math.random() * 200;
  const d = Math.random() * 3000;
  const e = Math.random() * 300;
  const f = Math.random() * 30;
  for (let i = 0; i < 100; i++) {
    const x = quant(
      20,
      width * Math.sin(i * a) +
        (width / 10) * Math.sin(i * b) +
        (width / 100) * Math.sin(i * c)
    );
    const y = quant(
      20,
      (height * (Math.sin(i * d) + Math.sin(i * e) + Math.sin(i * f) + 3)) / 6
    );
    objects.push(new Wall([x, y], [20, 20]));
  }
  return objects;
};
