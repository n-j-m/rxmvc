
export function range(length, initial = 0) {
  let ret = [];
  for (var i = 0; i < length; i++) {
    ret.push(initial + i);
  }
  return ret;
}

export function randomInt(length) {
  return Math.floor(Math.random() * length);
}
