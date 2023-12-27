export function transpose<T>(array: Array<Array<T>>): Array<Array<T>> {
  return array[0].map((_, i) => array.map(row => row[i]));
}
