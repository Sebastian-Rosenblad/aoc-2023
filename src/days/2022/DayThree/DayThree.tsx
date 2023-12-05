import { dayThreeData } from './data';
import { dayThreeExample } from './example_data';

function DayThree() {
  const data: Array<string> = dayThreeData.split(/\r?\n/);
  const exampleData: Array<string> = dayThreeExample.split(/\r?\n/);

  function calculate(a: Array<string>, partOne: boolean): string {
    if (partOne)
      return a.map(line => commonItemPartOne(line))
        .map(item => item.charCodeAt(0) - (item.charCodeAt(0) < 97 ? 38 : 96))
        .reduce((a, b) => a + b, 0)
        .toString();
    return toChunks(a).map(chunk => commonItemPartTwo(chunk))
      .map(item => item.charCodeAt(0) - (item.charCodeAt(0) < 97 ? 38 : 96))
      .reduce((a, b) => a + b, 0)
      .toString();
  }
  function toChunks(a: Array<string>): Array<Array<string>> {
    let chunks: Array<Array<string>> = [];
    for (let i = 0; i < a.length; i += 3)
      chunks.push(a.slice(i, i + 3));
    return chunks;
  }
  function commonItemPartOne(line: string): string {
    const c1 = line.slice(0, line.length / 2), c2 = line.slice(line.length / 2);
    for (let i = 0; i < c1.length; i++) {
      if (c2.includes(c1[i])) {
        return c1[i];
      }
    }
    return "";
  }
  function commonItemPartTwo(lines: Array<string>): string {
    let commons: string = lines[0], newCommons: string = "";
    for (let i = 1; i < lines.length; i++) {
      for (let j = 0; j < commons.length; j++) {
        if (lines[i].includes(commons[j])) {
          newCommons += commons[j];
        }
      }
      commons = newCommons;
      newCommons = "";
    }
    return commons;
  }

  return (
    <div className='day-three'>
      <p>Day three: Part 1</p>
      <h1>Answer: {calculate(data, true)}</h1>
      <h2>Example: {calculate(exampleData, true)}</h2>
      <p>Part 2</p>
      <h1>Answer: {calculate(data, false)}</h1>
      <h2>Example: {calculate(exampleData, false)}</h2>
    </div>
  );
}

export default DayThree;
