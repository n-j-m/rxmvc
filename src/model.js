<<<<<<< HEAD
=======
import { Rx } from "@cycle/core";
import { Map } from "immutable";
>>>>>>> e34b2954b80df803b94dc9cf648ae1a3f416d98f

export function model(actions, responses) {
  return Rx.Observable.combineLatest(
    actions.clicks$
      .startWith(0)
      .scan((total, value) => total + value),
    responses.userList$
      .startWith([]),
    (index, userList) => {
      if (index < 0) {
        index = userList.length + index;
      }
      let user = "";
      if (userList.length) {
        user = userList[index] ? userList[index].login : "";
      }

<<<<<<< HEAD
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
=======
      /*eslint-disable no-undef*/
      window.state = {index, userList, user};
      /*eslint-enable no-undef*/
      return new Map({
        index,
        userList,
        user
      });
    });
>>>>>>> e34b2954b80df803b94dc9cf648ae1a3f416d98f
}
