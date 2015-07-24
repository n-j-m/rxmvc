<<<<<<< HEAD
import { CustomRx as Rx } from "./common";

export function intent(DOM) {
  let newGameClick$ = DOM.get("#new-game", "click")
    .flatMap(() => Rx.Observable.just(null));
  let numberClick$ = DOM.get(".number-button", "click")
    .flatMap((ev) => Rx.Observable.just(ev.target.value));

  return {
    newGameClick$,
    numberClick$
=======
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
>>>>>>> e34b2954b80df803b94dc9cf648ae1a3f416d98f
  };
}
