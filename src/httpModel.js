
import { URL } from "./httpIntent";

export function httpModel(HTTP) {
  return {
    response$: HTTP
      .filter(res$ => res$.request.url.indexOf(URL) === 0)
      .mergeAll()
      .map(res => res.body)
  };
}
