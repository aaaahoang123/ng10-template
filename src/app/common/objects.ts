function transform(val): any {
  switch (true) {
    case (val instanceof Date):
      return val.valueOf();
    case (Array.isArray(val)):
      return val.map(transform).join(',');
    default:
      return val;
  }
}

export function filterParams(rawParams): any {
  return Object.keys(rawParams)
    .filter(key => rawParams[key])
    .reduce((result, current) => ({...result, [current]: transform(rawParams[current])}), {});
}
