import { daySixData } from './data';
import { daySixExample } from './example_data';

interface RecordM {
  time: number;
  dist: number;
}

function DaySix() {
  const data: Array<string> = daySixData.split(/\r?\n/);
  const exampleData: Array<string> = daySixExample.split(/\r?\n/);

  /**
   * Part 1: time 00:13:20 - rank 4259
   * Part 2: time 00:16:11 - rank 3279
   */

  function calculate(a: Array<string>, partOne: boolean): string {
    let records: Array<RecordM> = [];
    a[0].split(":")[1].split(" ").filter(word => word !== "").forEach(number => records.push({
      time: parseInt(number),
      dist: 0
    }));
    a[1].split(":")[1].split(" ").filter(word => word !== "").forEach((number, i) => records[i].dist = parseInt(number));
    if (partOne)
      return records.map(record => waysToWin(record)).reduce((a, b) => a * b, 1).toString();
    return waysToWin(records.reduce((a, b) => {
      return {
        time: parseInt(a.time.toString() + b.time.toString()),
        dist: parseInt(a.dist.toString() + b.dist.toString())
      }
    })).toString();
  }
  function waysToWin(record: RecordM): number {
    let wins: number = 0;
    for (let i = 1; i < record.time - 1; i++) {
      if (distance(i, record.time) > record.dist) wins += 1;
    }
    return wins;
  }
  function distance(hold: number, time: number): number {
    return hold * (time - hold);
  }

  return (
    <div className='day-six'>
      <p>Day six: Part 1</p>
      <h1>Answer: {calculate(data, true)}</h1>
      <h2>Example: {calculate(exampleData, true)}</h2>
      <p>Part 2</p>
      <h1>Answer: {calculate(data, false)}</h1>
      <h2>Example: {calculate(exampleData, false)}</h2>
    </div>
  );
}

export default DaySix;
