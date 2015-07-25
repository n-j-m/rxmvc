import { Rx } from "@cycle/core";
import { Map } from "immutable";

export function model(appActions, httpActions) {
  return Rx.Observable.combineLatest(
    appActions.clicks$
      .startWith(0)
      .scan((total, value) => total + value),
    httpActions.response$
      .startWith([]),
    (index, userList) => {
      index = index % (userList.length - 1);
      if (index < 0) {
        index = index + (userList.length - 1);
      }
      let user = null;
      if (userList.length) {
        user = userList[index];
      }

      return new Map({
        index,
        userList,
        user
      });
    });
}
