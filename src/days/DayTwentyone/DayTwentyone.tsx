import { transpose } from '../../utils';
import { dayTwentyoneData } from './data';
import { dayTwentyoneExample } from './example_data';

interface CoordsM {
  x: number;
  y: number;
}
interface RowBoundM {
  y: number;
  min: number;
  max: number;
}

function DayTwentyone() {
  const data: Array<string> = dayTwentyoneData.split(/\r?\n/);
  const exampleData: Array<string> = dayTwentyoneExample.split(/\r?\n/);
  let width: number, height: number;
  let bounds: Array<RowBoundM>

  /**
   * Part 1: time 00:00:00 - rank 0000
   * Part 2: time 00:00:00 - rank 0000
   */

  function calculate(a: Array<string>, partOne: boolean, steps: number): string {
    let time: number = Date.now();
    const unreachables: Array<CoordsM> = a.length < 20 ? [{x:8,y:8}] : [{x:125,y:8},{x:124,y:38},{x:27,y:63},{x:107,y:108},{x:116,y:127},{x:117,y:127}];
    let checked: Array<CoordsM> = [];
    const start: CoordsM = FindStart(a);
    bounds = [{ y: start.y, min: start.x, max: start.x }];
    let positions: Array<CoordsM> = [start];
    let possible: Array<number> = [1, 0];
    let step: number = 0;
    const map: Array<Array<string>> = transpose(a.map(line => line.split("")));
    width = map.length; height = map[0].length;
    let changes: Array<number> = [1];
    while (step < steps) {
      step += 1;
      let check: Array<CoordsM> = [...positions];
      positions = [];
      check.forEach(coord => {
        let dirs: Array<CoordsM> = [
          { x: coord.x + 1, y: coord.y },
          { x: coord.x - 1, y: coord.y },
          { x: coord.x, y: coord.y + 1 },
          { x: coord.x, y: coord.y - 1 }
        ];
        dirs.forEach(dir => {
          if (!InsideBounds(dir)) {
            if (IsValid(dir.x, dir.y, checked, map, partOne)) positions.push(dir);
            checked.push(dir);
          }
        });
        checked.sort((a, b) => a.y === b.y ? (a.x < start.x ? b.x - a.x : a.x - b.x) : a.y - b.y).forEach(check => {
          let row: RowBoundM | undefined = bounds.find(bound => bound.y === check.y);
          if (!row) bounds.push({ y: check.y, min: check.x, max: check.x });
          else {
            if (row.min === check.x + 1) row.min -= 1;
            if (row.max === check.x - 1) row.max += 1;
          }
        });
        unreachables.forEach(unreachable => {
          let rows: Array<RowBoundM> = bounds.filter(bound => bound.y % height + (bound.y % height < 0 ? height : 0) === unreachable.y);
          rows.forEach(row => {
            if (height + row.min % height === unreachable.x + 1) row.min -= 1;
            if (row.max % height === unreachable.x - 1) row.max += 1;
          });
        });
        checked = checked.filter(c => !InsideBounds(c));
      });
      possible[step % 2] += positions.length;
      changes.push(positions.length);
    }
    console.log(changes.map((c, i) => c - i * 4));
    return possible[step % 2] + " (" + (Date.now() - time) + ")";
  }
  function FindStart(a: Array<string>): CoordsM {
    for (let i = 0; i < a.length; i++) {
      if (a[i].includes("S")) return { x: a[i].indexOf("S"), y: i };
    }
    return { x: 0, y: 0 };
  }
  function IsValid(x: number, y: number, positions: Array<CoordsM>, map: Array<Array<string>>, partOne: boolean): boolean {
    if (positions.find(position => position.x === x && position.y === y)) return false;
    if (partOne && (x < 0 || x >= width || y < 0 || y >= height)) return false;
    let cx: number = x % width, cy: number = y % height;
    if (map[cx < 0 ? cx + width : cx][cy < 0 ? cy + height : cy] === "#") return false;
    return true;
  }
  function InsideBounds(coord: CoordsM): boolean {
    const row: RowBoundM | undefined = bounds.find(bound => bound.y === coord.y);
    return row !== undefined && (coord.x >= row.min && coord.x <= row.max);
  }

  return (
    <div className='day-twentyone'>
      <p>Day twentyone: Part 1</p>
      <h1>Answer: {calculate(data, true, 64)}</h1>
      <h2>Example: {calculate(exampleData, true, 6)}</h2>
      <p>Part 2</p>
      <h1>Answer: {calculate(data, false, 0)}</h1>
      <h2>Example: {calculate(exampleData, false, 6)}</h2>
      <h2>Example: {calculate(exampleData, false, 10)}</h2>
      <h2>Example: {calculate(exampleData, false, 50)}</h2>
      <h2>Example: {calculate(exampleData, false, 100)}</h2>
      <h2>Example: {calculate(exampleData, false, 65+131*2)}</h2>
      <h2>Example: {calculate(exampleData, false, 500)}</h2>
    </div>
  );
}

export default DayTwentyone;
