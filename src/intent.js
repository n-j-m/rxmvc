import { Rx } from "@cycle/core";

export function intent(DOM) {
  return {
    clicks$: Rx.Observable.merge(
      DOM.get(".increment", "click")
        .map(() => 1),
      DOM.get(".decrement", "click")
        .map(() => -1)
    ),
    refresh$: DOM.get(".refresh", "click")
      .map((ev) => {
        console.log("click!");
        return ev;
      })
      .startWith("refresh click")
  };
}
