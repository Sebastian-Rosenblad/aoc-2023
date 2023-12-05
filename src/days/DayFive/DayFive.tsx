import './DayFive.scss';
import { dayFiveData } from './data';
import { dayFiveExample } from './example_data';

function DayFive() {
  const data: Array<string> = dayFiveData.split(/\r?\n/);
  const exampleData: Array<string> = dayFiveExample.split(/\r?\n/);

  /**
   * Part 1: time 00:17:10 - rank 927
   * Part 2: time 00:57:46 - rank 1327
   */

  function calculate(a: Array<string>, partOne: boolean): string {
    let seeds: Array<number> = a[0].split(": ")[1].split(" ").map(line => parseInt(line));
    let maps: Array<Array<Array<number>>> = [];
    for (let i = 1; i < a.length; i++) {
      if (a[i] === "") maps.push([]);
      else if (!a[i].includes(":")) maps[maps.length - 1].push(a[i].split(" ").map(line => parseInt(line)));
    }
    if (partOne)
      return seeds.map(seed => toLocation(seed, maps)).sort((a, b) => a - b)[0].toString();
    let location: number = 0, seed: number = toSeed(location++, maps);
    while (!seedExists(seed, seeds)) seed = toSeed(location++, maps);
    return toLocation(seed, maps).toString();
  }
  function toLocation(seed: number, maps: Array<Array<Array<number>>>): number {
    maps.forEach(m => {
      seed = correspond(seed, m);
    });
    return seed;
  }
  function correspond(n: number, m: Array<Array<number>>): number {
    for (let i = 0; i < m.length; i++) {
      if (n >= m[i][1] && n < m[i][1] + m[i][2]) return n - m[i][1] + m[i][0];
    }
    return n;
  }
  function seedExists(seed: number, seeds: Array<number>): boolean {
    for (let i = 0; i < seeds.length; i += 2) {
      if (seed >= seeds[i] && seed < seeds[i] + seeds[i + 1]) return true;
    }
    return false;
  }
  function toSeed(location: number, maps: Array<Array<Array<number>>>): number {
    for (let i = maps.length - 1; i >= 0; i--) {
      location = reverse(location, maps[i]);
    }
    return location;
  }
  function reverse(n: number, m: Array<Array<number>>): number {
    for (let i = 0; i < m.length; i++) {
      if (n >= m[i][0] && n < m[i][0] + m[i][2]) return n + m[i][1] - m[i][0];
    }
    return n;
  }

  return (
    <div className='day-five'>
      <p>Day five: Part 1</p>
      <h1>Answer: {calculate(data, true)}</h1>
      <h2>Example: {calculate(exampleData, true)}</h2>
      <p>Part 2</p>
      <h1>Answer: {calculate(data, false)}</h1>
      <h2>Example: {calculate(exampleData, false)}</h2>
    </div>
  );
}

export default DayFive;
