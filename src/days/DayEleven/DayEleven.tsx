import { dayElevenData } from './data';
import { dayElevenExample } from './example_data';

interface CoordsM {
  x: number;
  y: number;
}

function DayEleven() {
  const data: Array<string> = dayElevenData.split(/\r?\n/);
  const exampleData: Array<string> = dayElevenExample.split(/\r?\n/);

  /**
   * Part 1: time 00:00:00 - rank 0000
   * Part 2: time 00:00:00 - rank 0000
   */

  function calculate(a: Array<string>, partOne: boolean): string {
    if (partOne) {
      let space = expandSpace(a);
      const galaxies: Array<CoordsM> = space.map((line, i) => findGalaxies(line).map(j => {
        return { x: j, y: i }
      })).flat();
      let distances: Array<number> = [];
      for (let i = 0; i < galaxies.length; i++) {
        for (let j = i + 1; j < galaxies.length; j++) {
          distances.push(distance(galaxies[i], galaxies[j]));
        }
      }
      return distances.reduce((a, b) => a + b, 0).toString();
    }
    return "";
  }
  function findGalaxies(line: string): Array<number> {
    let galaxies: Array<number> = [];
    for (let i = 0; i < line.length; i++) if (line[i] === "#") galaxies.push(i);
    return galaxies;
  }
  function expandSpace(space: Array<string>): Array<string> {
    for (let i = 0; i < space.length; i++) if (!space[i].includes("#"))
      space.splice(i++, 0, new Array<string>(space[0].length).fill(".").reduce((a, b) => a + b, ""));
    for (let i = 0; i < space[0].length; i++) {
      if (!columnHasGalaxy(space, i)) {
        for (let j = 0; j < space.length; j++) space[j] = space[j].slice(0, i) + "." + space[j].slice(i);
        i += 1;
      }
    }
    return space;
  }
  function columnHasGalaxy(space: Array<string>, column: number): boolean {
    for (let i = 0; i < space.length; i++) if (space[i][column] === "#") return true;
    return false;
  }
  function distance(a: CoordsM, b: CoordsM): number {
    return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
  }

  return (
    <div className='day-eleven'>
      <p>Day eleven: Part 1</p>
      <h1>Answer: {calculate(data, true)}</h1>
      <h2>Example: {calculate(exampleData, true)}</h2>
      <p>Part 2</p>
      <h1>Answer: {calculate(data, false)}</h1>
      <h2>Example: {calculate(exampleData, false)}</h2>
    </div>
  );
}

export default DayEleven;
