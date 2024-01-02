import { transpose } from '../../utils';
import { dayTwentyoneData } from './data';
import { dayTwentyoneExample } from './example_data';

interface CoordsM {
  x: number;
  y: number;
}

function DayTwentyone() {
  const data: Array<string> = dayTwentyoneData.split(/\r?\n/);
  const exampleData: Array<string> = dayTwentyoneExample.split(/\r?\n/);
  let dictionary: { [key: string]: Array<CoordsM>; };
  let width: number, height: number;

  /**
   * Part 1: time 00:00:00 - rank 0000
   * Part 2: time 00:00:00 - rank 0000
   */

  function calculate(a: Array<string>, partOne: boolean, steps: number): string {
    let time: number = Date.now();
    let reachable: Array<CoordsM> = [FindStart(a)];
    const map: Array<Array<string>> = transpose(a.map(line => line.split("")));
    dictionary = {};
    width = map.length; height = map[0].length;
    for (let i = 0; i < steps; i++) {
      let key: string = ToKey(reachable);
      if (dictionary.hasOwnProperty(key)) {
        reachable = dictionary[key];
        continue;
      }
      dictionary[key] = reachable;
      let newReach: Array<CoordsM> = [];
      while (reachable.length > 0) {
        let position: CoordsM | undefined = reachable.shift();
        if (position !== undefined) {
          if (IsValid(position.x - 1, position.y, newReach, map)) newReach.push({ x: position.x - 1, y: position.y });
          if (IsValid(position.x + 1, position.y, newReach, map)) newReach.push({ x: position.x + 1, y: position.y });
          if (IsValid(position.x, position.y - 1, newReach, map)) newReach.push({ x: position.x, y: position.y - 1 });
          if (IsValid(position.x, position.y + 1, newReach, map)) newReach.push({ x: position.x, y: position.y + 1 });
        }
      }
      reachable = newReach;
    }
    return reachable.length + " (" + (Date.now() - time) + ")";
  }
  function FindStart(a: Array<string>): CoordsM {
    for (let i = 0; i < a.length; i++) {
      if (a[i].includes("S")) return { x: a[i].indexOf("S"), y: i };
    }
    return { x: 0, y: 0 };
  }
  function ToKey(coords: Array<CoordsM>): string {
    return coords.sort((a, b) => a.x !== b.x ? a.x - b.x : a.y - b.y).map(coord => coord.x + "," + coord.y).join("-");
  }
  function IsValid(x: number, y: number, positions: Array<CoordsM>, map: Array<Array<string>>): boolean {
    if (positions.find(position => position.x === x && position.y === y)) return false;
    if (x < 0 || x >= width || y < 0 || y >= height) return false;
    if (map[x][y] === "#") return false;
    return true;
  }

  return (
    <div className='day-twentyone'>
      <p>Day twentyone: Part 1</p>
      <h1>Answer: {calculate(data, true, 64)}</h1>
      <h2>Example: {calculate(exampleData, true, 6)}</h2>
      <p>Part 2</p>
      <h1>Answer: {calculate(data, false, 0)}</h1>
      <h2>Example: {calculate(exampleData, false, 0)}</h2>
    </div>
  );
}

export default DayTwentyone;
