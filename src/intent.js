import { Rx } from "@cycle/core";

export function intent(DOM) {
  return {
    clicks$: Rx.Observable.merge(
      DOM.get(".increment", "click")
        .map(() => 1),
      DOM.get(".decrement", "click")
        .map(() => -1)
    ),
    refreshClick$: DOM.get(".refresh", "click")
  };
}
