import { dayThirteenData } from './data';
import { dayThirteenExample } from './example_data';

function DayThirteen() {
  const data: Array<string> = dayThirteenData.split(/\r?\n/);
  const exampleData: Array<string> = dayThirteenExample.split(/\r?\n/);

  /**
   * Part 1: time 00:23:07 - rank 1439
   * Part 2: time 00:35:43 - rank 1326
   */

  function calculate(a: Array<string>, partOne: boolean): string {
    let patterns: Array<Array<string>> = [[]];
    for (let i = 0; i < a.length; i++) {
      if (a[i] === "") patterns.push([]);
      else patterns[patterns.length - 1].push(a[i]);
    }
    if (partOne)
      return patterns.map(pattern => reflectionValue(pattern, 0)).reduce((a, b) => a + b, 0).toString();
    return patterns.map(pattern => reflectionValue(pattern, 1)).reduce((a, b) => a + b, 0).toString();
  }
  function reflectionValue(pattern: Array<string>, errors: number): number {
    let mirrored: Array<string> = new Array(pattern[0].length).fill("");
    for (let i = 0; i < pattern.length; i++) for (let j = 0; j < mirrored.length; j++) mirrored[j] += pattern[i][j];
    return reflectionPoint(pattern, errors) * 100 + reflectionPoint(mirrored, errors);
  }
  function reflectionPoint(pattern: Array<string>, errors: number): number {
    for (let i = 0.5; i < pattern.length - 1; i += 0.5)
      if (mirrors(pattern, Math.floor(i), Math.floor(i + 1), 0, errors))
        return Math.floor(i + 1);
    return 0;
  }
  function mirrors(pattern: Array<string>, low: number, high: number, errors: number, maxErrors: number): boolean {
    if (low < 0 || high >= pattern.length) return errors === maxErrors;
    if (pattern[low] === pattern[high]) return mirrors(pattern, low - 1, high + 1, errors, maxErrors);
    let totalErrors = errors + differences(pattern[low], pattern[high]);
    if (totalErrors > maxErrors) return false;
    return mirrors(pattern, low - 1, high + 1, totalErrors, maxErrors);
  }
  function differences(a: string, b: string): number {
    let d: number = 0;
    for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) d += 1;
    return d;
  }

  return (
    <div className='day-thirteen'>
      <p>Day thirteen: Part 1</p>
      <h1>Answer: {calculate(data, true)}</h1>
      <h2>Example: {calculate(exampleData, true)}</h2>
      <p>Part 2</p>
      <h1>Answer: {calculate(data, false)}</h1>
      <h2>Example: {calculate(exampleData, false)}</h2>
    </div>
  );
}

export default DayThirteen;
