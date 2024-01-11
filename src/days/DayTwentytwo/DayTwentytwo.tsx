import { dayTwentytwoData } from './data';
import { dayTwentytwoExample } from './example_data';

interface BrickM {
  id: string;
  start: CoordsM;
  end: CoordsM;
  supports: Array<{ id: string; supporters: number; }>;
  supportedBy: number;
  falls: number;
}
interface CoordsM {
  x: number;
  y: number;
  z: number;
}
interface HeightM {
  height: number;
  brick: string;
}

function DayTwentytwo() {
  const data: Array<string> = dayTwentytwoData.split(/\r?\n/);
  const exampleData: Array<string> = dayTwentytwoExample.split(/\r?\n/);
  let dictionary: { [key: string]: BrickM };

  /**
   * Part 1: time     >24h - rank 15988
   * Part 2: time     >24h - rank 15666
   */

  function calculate(a: Array<string>, partOne: boolean): string {
    const time: number = Date.now();
    let bricks: Array<BrickM> = a.map((line, i) => ParseBrick(line, i)).sort((a, b) => a.start.z - b.start.z);
    dictionary = {};
    bricks.forEach(brick => dictionary[brick.id] = brick);
    const tx: Array<number> = bricks.map(brick => [brick.start.x, brick.end.x]).flat(), ty: Array<number> = bricks.map(brick => [brick.start.y, brick.end.y]).flat();
    const width: number = Math.max(...tx) - Math.min(...tx) + 1, height: number = Math.max(...ty) - Math.min(...ty) + 1;
    let heightmap: Array<Array<HeightM>> = new Array(width).fill(-1).map(() => new Array(height).fill({ height: 0, brick: "" }));
    for (let i = 0; i < bricks.length; i++) {
      const area: Array<CoordsM> = GetArea(bricks[i]);
      const heights: Array<HeightM> = area.map(coord => heightmap[coord.x][coord.y]);
      const height: number = Math.max(...heights.map(h => h.height));
      let land: Array<string> = heights.filter(h => h.height === height).map(h => h.brick);
      land = land.filter((brick, j) => j === land.indexOf(brick) && brick !== "");
      bricks.filter(brick => land.includes(brick.id)).forEach(brick => brick.supports.push({ id: bricks[i].id, supporters: land.length }));
      let brick: BrickM = bricks[i];
      brick.supportedBy = land.length;
      const tall: number = brick.end.z - brick.start.z + 1;
      area.forEach(coord => heightmap[coord.x][coord.y] = { height: height + tall, brick: bricks[i].id });
    }
    if (partOne) return bricks.filter(brick => {
      if (brick.supports.length === 0) return true;
      if (!brick.supports.find(sup => sup.supporters === 1)) return true;
      return false;
    }).length + " (" + (Date.now() - time) + ")";
    bricks.sort((a, b) => b.end.z - a.end.z).forEach(brick => [brick.falls] = CalculateFalls(brick, []));
    return bricks.map(brick => brick.falls).reduce((a, b) => a + b, 0) + " (" + (Date.now() - time) + ")";
  }
  function ParseBrick(line: string, index: number): BrickM {
    const coords: Array<string> = line.split("~");
    const one: CoordsM = ParseCoords(coords[0]), two: CoordsM = ParseCoords(coords[1]);
    return { start: one, end: two, id: index.toString(), supports: [], supportedBy: 0, falls: -1 };
  }
  function ParseCoords(line: string): CoordsM {
    const values: Array<number> = line.split(",").map(n => parseInt(n));
    return { x: values[0], y: values[1], z: values[2] };
  }
  function GetArea(brick: BrickM): Array<CoordsM> {
    let area: Array<CoordsM> = [];
    for (let i = brick.start.x; i <= brick.end.x; i++)
      for (let j = brick.start.y; j <= brick.end.y; j++)
        area.push({ x: i, y: j, z: -1 });
    return area;
  }
  function CalculateFalls(brick: BrickM, fallens: Array<string>): [number, Array<string>] {
    fallens = fallens.concat(brick.supports.map(support => support.id));
    let falls: number = 0;
    for (let i = 0; i < brick.supports.length; i++) {
      const support: BrickM = dictionary[brick.supports[i].id];
      if (fallens.filter(fallen => fallen === support.id).length >= support.supportedBy) {
        let newFalls: number = 0;
        [newFalls, fallens] = CalculateFalls(support, fallens);
        falls += 1 + newFalls;
      }
    }
    return [falls, fallens];
  }

  return (
    <div className='day-twentytwo'>
      <p>Day twentytwo: Part 1</p>
      <h1>Answer: {calculate(data, true)}</h1>
      <h2>Example: {calculate(exampleData, true)}</h2>
      <p>Part 2</p>
      <h1>Answer: {calculate(data, false)}</h1>
      <h2>Example: {calculate(exampleData, false)}</h2>
    </div>
  );
}

export default DayTwentytwo;
