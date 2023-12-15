import { dayFifteenData } from './data';
import { dayFifteenExample } from './example_data';

interface DataM {
  box: number;
  label: string;
  focal: number;
}

function DayFifteen() {
  const data: Array<string> = dayFifteenData.split(/\r?\n/);
  const exampleData: Array<string> = dayFifteenExample.split(/\r?\n/);

  /**
   * Part 1: time 00:05:53 - rank 1673
   * Part 2: time 00:47:16 - rank 4045
   */

  function calculate(a: Array<string>, partOne: boolean): string {
    let steps: Array<string> = a[0].split(",");
    if (partOne)
      return steps.map(step => hash(step)).reduce((a, b) => a + b, 0).toString();
    let hashmap: Array<DataM> = a[0].split(",").map(step => {
      let l: string = step.includes("=") ? step.split("=")[0] : step.split("-")[0];
      return {
        box: hash(l),
        label: l,
        focal: step.includes("=") ? parseInt(step.split("=")[1]) : -1
      };
    });
    return boxes(hashmap).map((box, i) => box.map((slot, i) => slot.focal * (i + 1)).reduce((a, b) => a + b, 0) * (i + 1)).reduce((a, b) => a + b, 0).toString();
  }
  function hash(chars: string): number {
    let current: number = 0;
    chars.split("").forEach(char => {
      current += char.charCodeAt(0);
      current *= 17;
      current %= 256;
    });
    return current;
  }
  function boxes(hashmap: Array<DataM>): Array<Array<DataM>> {
    let boxes: Array<Array<DataM>> = new Array(256).fill(0).map(() => []);
    hashmap.forEach(h => {
      let box: number = hash(h.label);
      let index: number = boxes[box].findIndex(b => b.label === h.label);
      if (h.focal < 0) if (index >= 0) boxes[box].splice(index, 1);
      else {
        if (index >= 0) boxes[box][index] = h;
        else boxes[box].push(h);
      }
    });
    return boxes;
  }

  return (
    <div className='day-fifteen'>
      <p>Day fifteen: Part 1</p>
      <h1>Answer: {calculate(data, true)}</h1>
      <h2>Example: {calculate(exampleData, true)}</h2>
      <p>Part 2</p>
      <h1>Answer: {calculate(data, false)}</h1>
      <h2>Example: {calculate(exampleData, false)}</h2>
    </div>
  );
}

export default DayFifteen;
