import { Rx } from "@cycle/core";
import { Seq } from "immutable";

export function makeGameState(order, pressed = []) {
  return {
    order: new Seq(order),
    pressed: new Seq(pressed)
  };
}

Rx.Observable.prototype.takeWhileInclusive = function takeWhileInclusive(predicate) {
  return Rx.Observable.create(
    observer => {
      this.subscribe(
        val => {
          observer.onNext(val);

          if (!predicate(val)) {
            observer.onCompleted();
          }
        },
        observer.onError.bind(observer),
        observer.onCompleted.bind(observer)
      );
    }.bind(this)
  );
};

export const CustomRx = Rx;
