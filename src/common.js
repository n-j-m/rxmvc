import Rx from "rx";

export function makeGameState(order, pressed = []) {
  return { order, pressed };
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
