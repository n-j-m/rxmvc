import Cycle from "@cycle/core";
import { makeDOMDriver } from "@cycle/dom";
import { makeHTTPDriver } from "@cycle/http";

import { view } from "./view";
import { model } from "./model";
import { intent } from "./intent";
import { httpIntent } from "./httpIntent";
import { httpModel } from "./httpModel";

function main({ DOM, HTTP }) {
  let actions = intent(DOM);
  let httpActions = httpIntent(actions);
  let httpState = httpModel(HTTP);

  let vtree$ = view(model(actions, httpState));

  let requests = {
    DOM: vtree$,
    HTTP: httpActions.request$
  };

  return requests;
}

Cycle.run(main, {
  DOM: makeDOMDriver("#app"),
  HTTP: makeHTTPDriver()
});
