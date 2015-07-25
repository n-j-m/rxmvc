
export const URL = "https://api.github.com/users";

/*eslint-disable no-undef*/
const TOKEN = GITHUB_TOKEN;
/*eslint-enable no-undef*/

export function httpIntent({ refreshClick$ }) {
  return {
    request$: refreshClick$
      .startWith("refresh click")
      .map(() => {
        let randomOffset = Math.floor(Math.random() * 500);
        let headers = {};
        if (TOKEN) {
          headers.Authorization = `token ${TOKEN}`;
        }
        return {
          url: `${URL}?since=${randomOffset}`,
          method: "GET",
          headers
        };
      })
  };
}
