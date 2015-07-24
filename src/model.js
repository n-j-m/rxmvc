
import { range, randomInt } from "./utils";
import { makeGameState } from "./common";

export function model({newGameClick$, numberClick$}) {
  let newGame$ = newGameClick$
    .startWith(null)
    .map(() =>
      makeGameState(
        range(4).map(() => randomInt(4))
      )
    );
  let number$ = newGameClick$
    .map(order =>
      numberClick$
        .scan(makeGameState(order), (state, value) =>
          makeGameState(state.order, state.pressed.concat(value ? [value] : []))
        )
        .takeWhileInclusive(state => {
          let prefix = state.order.slice(0, state.pressed.size);
          return state.pressed.equals(prefix);
        })
        .take(order.length)
        .last()
        .takeUntil(newGameClick$)
    )
    .startWith(makeGameState(
      range(4).map(() => randomInt(4))
    ));
  return newGame$.combineLatest(
    number$,
    (order, gameState) => ({ order, gameState })
  );
}
