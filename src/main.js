import Cycle from "@cycle/core";
import { makeDOMDriver } from "@cycle/dom";

import { intent } from "./intent";
import { model } from "./model";
import { view } from "./view";

function main({DOM}) {
  let actions = intent(DOM);
  let state$ = model(actions);
  let vtree$ = view(state$);

  let requests = {
    DOM: vtree$
  };

  return requests;
}

Cycle.run(main, {
  DOM: makeDOMDriver("#app")
});
