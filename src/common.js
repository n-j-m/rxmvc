import Rx from "rx";

export function makeGameState(order, pressed = []) {
  return {
    order,
    pressed
  };
}

Rx.Observable.prototype.takeWhileInclusive = function takeWhileInclusive(predicate) {
  return Rx.Observable.create(
    (o) => {
      this.subscribe(
        (val) => {
          o.onNext(val);

          if (!predicate(val)) {
            o.onCompleted();
          }
        },
        o.onError.bind(o),
        o.onCompleted.bind(o)
      );
    }.bind(this)
  );
};

export const CustomRx = Rx;
