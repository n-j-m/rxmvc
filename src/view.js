import { h } from "@cycle/dom";

import { makeGameState } from "./common";
import { newGameStream, gameResultStream } from "./modle";
import { CustomRx as Rx } from "./common";

export function view(state$) {
  return state$.map(({order, pressed}) =>
    h("div", [
      renderGame(order),
      renderResult({order, pressed})
    ])
  );
}

function renderGame(order) {
  return h("div", [
    h("ul",
      order.map((num, i) =>
        h(`li.i${i}`, {key: i}, num)
      )
    ),
    h("div",
      order.map((num, i) =>
        h("button.number-button", {type: "button", value: i, key: i}, i)
      )
    )
  ]);
}

function renderResult(state) {

}
