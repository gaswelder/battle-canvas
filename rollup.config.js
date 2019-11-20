export default [
  {
    input: "src/game/game.js",
    output: {
      file: "build/game.bin.js",
      format: "cjs"
    }
  },
  {
    input: "src/ui/ui.js",
    output: [
      {
        file: "build/ui.bin.js",
        format: "iife",
        name: "ui"
      }
    ]
  }
];
