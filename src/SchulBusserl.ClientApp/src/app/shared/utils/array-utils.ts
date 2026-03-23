export function ascending<T>(selector: (item: T) => string): (a: T, b: T) => number {
  return (a, b) => selector(a).localeCompare(selector(b));
}
