import { h } from "@cycle/dom";

export function view(state$) {
  return state$
    .map(state => {
      console.log("state:", state);
      return state;
    })
    .map(({gameState}) =>
      h("div", [
        renderGame(gameState),
        renderResult(gameState)
      ])
    );
}

function renderGame({order}) {
  return h("div", [
    h("ul", [
      order.toArray().map((num, i) =>
        h(`li.i${i}`, {key: i}, `${num}`)
      )
    ]),
    h("div",
      order.toArray().map((num, i) =>
        h("button.number-button", {type: "button", value: i, key: i}, `${i}`)
      )
    )
  ]);
}

function renderResult(state) {
  console.log("result pressed:", state.pressed);
  console.log("result order:", state.order);
  return h("h1", state.pressed.equals(state.order) ?
    "You won!" : "really?");
}
