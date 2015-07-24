import { Rx } from "@cycle/core";
import { Map } from "immutable";

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
      /*eslint-disable no-undef*/
      window.state = {index, userList, user};
      /*eslint-enable no-undef*/
      return new Map({
        index,
        userList,
        user
      });
    });
}
