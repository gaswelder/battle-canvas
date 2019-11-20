import { createRenderer } from "./render";

export function createUI(container) {
  container.tabIndex = 0;

  let dispatch = () => {};

  const keys = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " "];
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
      dispatch(a, true);
      e.preventDefault();
    }
  });
  container.addEventListener("keyup", e => {
    const a = action(e);
    if (a) {
      dispatch(a, false);
      e.preventDefault();
    }
  });

  return {
    render: createRenderer(container),
    onAction: f => {
      dispatch = f;
    }
  };
}
