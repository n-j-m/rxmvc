import Cycle from "@cycle/core";
import { makeDOMDriver } from "@cycle/dom";
<<<<<<< HEAD

import { intent } from "./intent";
import { model } from "./model";
import { view } from "./view";

function main({DOM}) {
  let actions = intent(DOM);
  let state$ = model(actions);
  let vtree$ = view(state$);

  let requests = {
    DOM: vtree$
=======
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
>>>>>>> e34b2954b80df803b94dc9cf648ae1a3f416d98f
  };

  return requests;
}

Cycle.run(main, {
  DOM: makeDOMDriver("#app"),
  HTTP: makeHTTPDriver()
});
