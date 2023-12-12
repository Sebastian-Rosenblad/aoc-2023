import { dayTwelveData } from './data';
import { dayTwelveExample } from './example_data';

interface SpringM {
  damaged: Array<number>;
  condition: Array<number>;
}

function DayTwelve() {
  const data: Array<string> = dayTwelveData.split(/\r?\n/);
  const exampleData: Array<string> = dayTwelveExample.split(/\r?\n/);

  /**
   * Part 1: time 00:00:00 - rank 0000
   * Part 2: time 00:00:00 - rank 0000
   */

  function calculate(a: Array<string>, partOne: boolean): string {
    if (partOne) {
      const springs: Array<SpringM> = a.map(line => {
        return {
          damaged: line.split(" ")[1].split(",").map(val => parseInt(val)),
          condition: line.split(" ")[0].split("").map(val => val === "?" ? -1 : (val === "." ? 0 : 1))
        };
      });
      return springs.map(spring => arrangements(spring)).reduce((a, b) => a + b, 0).toString();
    }
    return "";
  }
  function arrangements(spring: SpringM): number {
    return arrange([], spring, 0).filter(pos => pos).length;
  }
  function arrange(condition: Array<number>, spring: SpringM, index: number): Array<boolean> {
    if (condition.length === spring.condition.length)
      return [possible(condition, spring.damaged)];
    if (spring.condition[index] >= 0)
      return arrange([...condition, spring.condition[index]], spring, index + 1);
    return [...arrange([...condition, 0], spring, index + 1), ...arrange([...condition, 1], spring, index + 1)];
  }
  function possible(condition: Array<number>, damaged: Array<number>): boolean {
    let pairs: Array<number> = [0];
    for (let i = 0; i < condition.length; i++) {
      if (condition[i] === 0) pairs.push(0);
      else pairs[pairs.length - 1] += 1;
    }
    return equals(pairs.filter(p => p > 0), damaged);
  }
  function equals(a: Array<number>, b: Array<number>): boolean {
    if (a.length === b.length) {
      for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) return false;
      return true;
    }
    return false;
  }

  return (
    <div className='day-twelve'>
      <p>Day twelve: Part 1</p>
      <h1>Answer: {calculate(data, true)}</h1>
      <h2>Example: {calculate(exampleData, true)}</h2>
      <p>Part 2</p>
      <h1>Answer: {calculate(data, false)}</h1>
      <h2>Example: {calculate(exampleData, false)}</h2>
    </div>
  );
}

export default DayTwelve;
//