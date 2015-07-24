import { h } from "@cycle/dom";

export function view(state$) {
  return state$
    .map(state => {
      console.log("state:", state.get("userList"));
      return h("div", [
        h("h1", "Hello"),
        h("button.refresh", "Refresh"),
        h("p", `counter ${state.get("index")}`),
        h("p", `User ${state.get("user")}`),
        h("div", [
        h("button.decrement", "<< decrement"),
          h("button.increment", "increment >>")
        ])
      ]);
    });
}
