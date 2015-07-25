
const URL = "https://api.github.com/users";

/*eslint-disable no-undef*/
const TOKEN = GITHUB_TOKEN;
/*eslint-enable no-undef*/

export function request({ refresh$ }, HTTP) {
  let userList$ = HTTP
    .filter(res$ => res$.request.url.indexOf(URL) === 0)
    .mergeAll()
    .map(res => res.body);

  let getUserList$ = refresh$
    .startWith("refresh click")
    .map(() => {
      let headers = {};
      if (TOKEN) {
        headers.Authorization = `token ${TOKEN}`;
      }
      return {
        url: `${URL}`,
        method: "GET",
        headers
      };
    });

  return {
    userList$,
    getUserList$
  };
}
