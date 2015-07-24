import { CustomRx as Rx } from "./common";

export function intent(DOM) {
  let newGameClick$ = DOM.get("#new-game", "click")
    .flatMap(() => Rx.Observable.just(null));
  let numberClick$ = DOM.get(".number-button", "click")
    .flatMap((ev) => Rx.Observable.just(ev.target.value));

  return {
    newGameClick$,
    numberClick$
  };
}
