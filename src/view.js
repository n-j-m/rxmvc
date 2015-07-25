import { h } from "@cycle/dom";

export function view(state$) {
  return state$
    .map(state => {
      let user = state.get("user");
      return h("div", [
        h("h1", "GitHub User Browser"),
        h("button.refresh", "Refresh"),
        h("p", `Index ${state.get("index")}`),
        h("p", [
          h("span", [
            "User: ",
            user ?
              h("a", {href: user.html_url, target: "_blank"}, user.login) :
              ""
          ])
        ]),
        h("div", [
        h("button.decrement", "<< backward"),
          h("button.increment", "forward >>")
        ])
      ]);
    });
}
