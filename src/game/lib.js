export function rand(a, b) {
  return a + Math.round(Math.random() * (b - a));
}

export const quant = (q, x) => Math.round(x / q) * q;
