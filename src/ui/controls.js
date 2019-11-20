export function setControls(playerId, keys, container, game) {
  const playerActions = [
    "ArrowUp",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    " "
  ];
  const action = event => playerActions[keys.indexOf(event.key)];

  container.addEventListener("keydown", e => {
    const a = action(e);
    if (a) {
      game.dispatchKey(playerId, a, true);
      e.preventDefault();
    }
  });
  container.addEventListener("keyup", e => {
    const a = action(e);
    if (a) {
      game.dispatchKey(playerId, a, false);
      e.preventDefault();
    }
  });
}
