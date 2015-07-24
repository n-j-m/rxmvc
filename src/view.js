import { h } from "@cycle/dom";

export function view(state$) {
  return state$
    .map(state => {
<<<<<<< HEAD
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
=======
      console.log("state:", state.get("userList"));
      return h("div", [
        h("h1", "Hello"),
        h("button.refresh", "Refresh"),
        h("p", `counter ${state.get("index")}`),
        h("p", `User ${state.get("user")}`),
        h("div", [
        h("button.decrement", "<< decrement"),
          h("button.increment", "increment >>")
        ])
      ]);
    });
>>>>>>> e34b2954b80df803b94dc9cf648ae1a3f416d98f
}
