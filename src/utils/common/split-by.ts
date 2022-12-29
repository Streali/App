export function splitBy<T>(items: T[], splitter: (item: T) => boolean): [Array<T>, Array<T>] {
  const itemsA = [];
  const itemsB = [];

  for (const item of items) {
    splitter(item) ? itemsA.push(item) : itemsB.push(item);
  }

  return [itemsA, itemsB];
}
