import Cycle from "@cycle/core";
import { makeDOMDriver } from "@cycle/dom";
import { makeHTTPDriver } from "@cycle/http";

import { view } from "./view";
import { model } from "./model";
import { intent } from "./intent";
import { request } from "./request";

function main({ DOM, HTTP }) {
  let actions = intent(DOM);
  let responses = request(actions, HTTP);

  let vtree$ = view(model(actions, responses));

  let requests = {
    DOM: vtree$,
    HTTP: responses.getUserList$
  };

  return requests;
}

Cycle.run(main, {
  DOM: makeDOMDriver("#app"),
  HTTP: makeHTTPDriver()
});
