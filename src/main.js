import _template from "lodash/string/template";
import _isEqual from "lodash/lang/isEqual";
import _range from "lodash/utility/range";
import { CustomRx as Rx } from "./common";

const { Observable } = Rx;

import "./style.css";

import { makeGameState } from "./common";
let newGameButton = document.getElementById("new-game"),
  game = document.querySelector(".game"),
  result = document.querySelector(".result"),
  gameTemplate = _template(document.getElementById("game-template").innerText),
  resultTemplate = _template(document.getElementById("result-template").innerText);

function renderGameAndHideResult(order) {
  result.innerHTML = "";
  game.innerHTML = gameTemplate({data: order});
}

function showResult(resultData) {
  result.innerHTML = resultTemplate({
    data: _isEqual(resultData.order, resultData.pressed)
  });
  game.innerHTML = "";
}

function randomSequenceOfNumbers() {
  return _range(4).map(() =>
    Math.floor(Math.random() * 4)
  );
}

function main() {

  let newGameClicks$ = Observable.fromEvent(newGameButton, "click");

  newGameClicks$
    // generage an array of numbers every click
    .map(randomSequenceOfNumbers)

    // use the array of numbers as the data to renderGameAndHideResult
    .do(renderGameAndHideResult)

    .map(order =>
      // for each array of numbers, return an event stream of button clicks
      Observable.fromEvent(game.querySelector(".number-buttons"), "click")
        // on each click, given the previous state, we pass along the new
        // "game state", which contains 2 pieces of information
        // - the original order
        // - the buttons pressed so far
        // so after the call we get a stream of game-states which emits every
        // time the user clicks a number button
        .scan(makeGameState(order), (state, event) => {
          let val = +event.target.value;
          return makeGameState(state.order, state.pressed.concat([val]));
        })

        // we have 2 termination conditions:
        // - wrong button presses
        // - the player got them all correct
        //
        // so we make the stream of game-states end on either of the above
        // conditions.  note this uses a helper function defined in
        // common.js that acts like the same as RxJS's `takeWhile`, except it
        // includes the last item
        .takeWhileInclusive((state) => {
          var prefix = state.order.slice(0, state.pressed.length);
          return _isEqual(prefix, state.pressed);
        })
        .take(order.length)

        // we only want to concern ourselves with the state of things when the
        // game ends, so this returns a stream of only one game-state, which
        // emits on the last click
        .last()

        // also, end the stream if the users requests a new game. this still
        // returns a stream of only one game-state
        .takeUntil(newGameClicks$)
    )

    // now that we have a steram of steams of single game-state, analogous to a
    // nested array of objects -- `[[{}], [{}], ...]`, we really just want a
    // flattened stream of the final game-states. so the call below takes out
    // the *inner* stream
    .concatAll()

    .do(showResult)

    // in RxJS, these event streams aren't active until you call something like
    // subscribe or forEach
    .subscribe();
}

main();
