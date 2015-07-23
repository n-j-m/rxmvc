import { CustomRx as Rx } from "./common";

import { range, randomInt } from "./utils";
import { makeGameState } from "./common";

export function newGameStream() {
  let subject$ = new Rx.Subject();
  let observable$ = subject$.map(() =>
    range(4).map(() => randomInt(4)
  )
  .share();

  return Rx.Subject.create(subject$, observable$);
}

export function gameResultStream(newGame$) {
  let number$ = new Rx.Subject();
  let observable$ = newGame$
    .map(order =>
      number$
        .scan(makeGameState(order), (state, value) =>
          makeGameState(state.order, state.pressed.concat([value]))
        )
        .takeWhileInclusive(state => {
          let prefix = state.order.slice(0, state.pressed.length);
          return state.pressed.equals(prefix);
        })
        .take(order.size)
        .last()
        .takeUntil(newGame$)
    )
    .concatAll()
    .share();

  return Rx.Subject.create(number$, observable$);
}
