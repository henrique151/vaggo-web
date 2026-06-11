export function toObject(o: object): object {
  const map = {};
  for (const [key, value] of Object.entries(o)) {
    if (value instanceof Object) {
      map[key] = toObject(value);
    } else {
      map[key] = value;
    }
  }
  return map;
}
