import { dayEighteenData } from './data';
import { dayEighteenExample } from './example_data';

interface DigM {
  dir: CoordsM;
  len: number;
}
interface CoordsM {
  x: number;
  y: number;
}
interface BoundsM {
  t: number;
  l: number;
  b: number;
  r: number;
}

function DayEighteen() {
  const data: Array<string> = dayEighteenData.split(/\r?\n/);
  const exampleData: Array<string> = dayEighteenExample.split(/\r?\n/);

  /**
   * Part 1: time     >24h - rank 27801
   * Part 2: time 00:00:00 - rank 0000
   */

  function calculate(a: Array<string>, partOne: boolean): string {
    if (!partOne) return "";
    let time: number = Date.now();
    let plan: Array<DigM> = a.map(data => {
      let temp: Array<string> = data.split(" ");
      let dir: number = parseInt(temp[2].slice(-2, -1)), len: string = temp[2].slice(2, -2);
      return {
        dir: partOne ? toCoords(temp[0]) : { x: (1 - dir) % 2, y: (2 - dir) % 2 },
        len: partOne ? parseInt(temp[1]) : parseInt(len, 16)
      };
    });
    let edge: Array<CoordsM> = [], x: number = 0, y: number = 0;
    plan.forEach(task => {
      for (let i = 0; i < task.len; i++) edge.push({ x: x + task.dir.x * i, y: y + task.dir.y * i });
      x += task.dir.x * task.len;
      y += task.dir.y * task.len;
    });
    let answer: string = (FloodFill(edge).length + edge.length).toString();
    console.log(Date.now() - time);
    return answer;
  }
  function toCoords(t: string): CoordsM {
    switch (t) {
      case "U": return { x: 0, y: -1 };
      case "D": return { x: 0, y: 1 };
      case "L": return { x: -1, y: 0 };
      default: return { x: 1, y: 0 };
    }
  }
  function FloodFill(edge: Array<CoordsM>): Array<CoordsM> {
    let center: CoordsM = FindPointInside(edge);
    let bounds: BoundsM = { l: edge[0].x, r: edge[0].x, t: edge[0].y, b: edge[0].y };
    edge.forEach(coord => {
      if (bounds.l > coord.x) bounds.l = coord.x;
      else if (bounds.r < coord.x) bounds.r = coord.x;
      if (bounds.t > coord.y) bounds.t = coord.y;
      else if (bounds.b < coord.y) bounds.b = coord.y;
    });
    let fill: Array<CoordsM> = [], check: Array<CoordsM> = [center];
    while (check.length > 0) {
      let checking: CoordsM | undefined = check.shift();
      if (checking !== undefined) {
        if (Check(checking.x, checking.y, bounds, edge, fill)) {
          fill.push({ x: checking.x, y: checking.y });
          check.push(
            { x: checking.x + 1, y: checking.y },
            { x: checking.x - 1, y: checking.y },
            { x: checking.x, y: checking.y + 1 },
            { x: checking.x, y: checking.y - 1 }
          );
        }
      }
    }
    return fill;
  }
  function Check(x: number, y: number, bounds: BoundsM, edge: Array<CoordsM>, fill: Array<CoordsM>): boolean {
    if (fill.find(c => c.x === x && c.y === y)) return false;
    if (edge.find(c => c.x === x && c.y === y)) return false;
    if (x < bounds.l || x > bounds.r || y < bounds.t || y > bounds.b) return false;
    return true;
  }
  function FindPointInside(edge: Array<CoordsM>): CoordsM {
    return { x: 1, y: 1 };
  }

  return (
    <div className='day-eighteen'>
      <p>Day eighteen: Part 1</p>
      <h1>Answer: {calculate(data, true)}</h1>
      <h2>Example: {calculate(exampleData, true)}</h2>
      <p>Part 2</p>
      <h1>Answer: {calculate(data, false)}</h1>
      <h2>Example: {calculate(exampleData, false)}</h2>
    </div>
  );
}

export default DayEighteen;
