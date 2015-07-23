import Cycle from "@cycle/core";
import { h, makeDOMDriver } from "@cycle/dom";

import { CustomRx as Rx } from "./common";

function main() {
  let requests = {
    DOM: Rx.Observable.just(
      h("div.jumbotron", [
        h("h1", "Hello!")
      ])
    )
  };

  return requests;
}

Cycle.run(main, {
  DOM: makeDOMDriver("#app")
});
