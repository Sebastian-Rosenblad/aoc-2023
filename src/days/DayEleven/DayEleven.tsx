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
   * Part 1: time 00:29:07 - rank 3673
   * Part 2: time 00:52:13 - rank 4526
   */

  function calculate(a: Array<string>, partOne: boolean): string {
    let galaxies: Array<CoordsM> = a.map((line, i) => findGalaxies(line).map(j => {
      return { x: j, y: i }
    })).flat();
    const emptyspace = {
      x: new Array(a[0].length).fill(-1).map((n, i) => columnHasGalaxy(a, i) ? -1 : i).filter(n => n >= 0),
      y: a.map((line, i) => line.includes("#") ? -1 : i).filter(n => n >= 0)
    };
    let distances: Array<number> = [];
    for (let i = 0; i < galaxies.length; i++) {
      for (let j = i + 1; j < galaxies.length; j++) {
        if (partOne) distances.push(distance(galaxies[i], galaxies[j], emptyspace, 1));
        else distances.push(distance(galaxies[i], galaxies[j], emptyspace, 999999));
      }
    }
    return distances.reduce((a, b) => a + b, 0).toString();
  }
  function findGalaxies(line: string): Array<number> {
    let galaxies: Array<number> = [];
    for (let i = 0; i < line.length; i++) if (line[i] === "#") galaxies.push(i);
    return galaxies;
  }
  function columnHasGalaxy(space: Array<string>, column: number): boolean {
    for (let i = 0; i < space.length; i++) if (space[i][column] === "#") return true;
    return false;
  }
  function distance(a: CoordsM, b: CoordsM, emptyspace: { x: Array<number>, y: Array<number> }, expanded: number): number {
    let xb: number = emptyspace.x.filter(cx => inbetween(cx, a.x, b.x)).length * expanded;
    let yb: number = emptyspace.y.filter(cy => inbetween(cy, a.y, b.y)).length * expanded;
    return Math.abs(a.x - b.x) + Math.abs(a.y - b.y) + xb + yb;
  }
  function inbetween(v: number, a: number, b: number): boolean {
    if (a > b && v > b && v < a) return true;
    if (b > a && v > a && v < b) return true;
    return false;
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
