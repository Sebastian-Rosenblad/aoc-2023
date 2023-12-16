import { daySixteenData } from './data';
import { daySixteenExample } from './example_data';

interface CoordsM {
  x: number;
  y: number;
}
interface BeamM {
  x: number;
  y: number;
  dir: CoordsM;
  key: string;
}
interface ItemM {
  x: number;
  y: number;
  type: string;
}

function DaySixteen() {
  const data: Array<string> = daySixteenData.split(/\r?\n/);
  const exampleData: Array<string> = daySixteenExample.split(/\r?\n/);
  let width: number = 0, height: number = 0;

  /**
   * Part 1: time 00:00:00 - rank 0000
   * Part 2: time 00:00:00 - rank 0000
   */

  function calculate(a: Array<string>, partOne: boolean): string {
    width = a[0].length; height = a.length;
    let items: Array<ItemM> = [];
    for (let x = 0; x < width; x++) for (let y = 0; y < height; y++) if (a[y][x] !== ".") items.push({ x: x, y: y, type: a[y][x] });
    if (partOne)
      return simulate(items).toString();
    return "";
  }
  function simulate(items: Array<ItemM>): number {
    let beams: Array<BeamM> = [{ x: 0, y: 0, dir: { x: 1, y: 0 }, key: "0,0,1,0" }];
    if (items[0].x === 0 && items[0].y === 0) beams = turn(beams[0], items[0].type);
    let history: Array<CoordsM> = move(beams, items, []).map(h => {
      return {
        x: parseInt(h.split(",")[0]),
        y: parseInt(h.split(",")[1])
      };
    });
    return history.filter((h, i) => history.findIndex(n => n.x === h.x && n.y === h.y) === i).length;
  }
  function move(beams: Array<BeamM>, items: Array<ItemM>, history: Array<string>): Array<string> {
    if (beams.length > 0) {
      let beam: BeamM = beams[0];
      if (history.includes(beam.key)) return move(beams.slice(1), items, history);
      let item: ItemM | undefined = undefined;
      if (beam.dir.x < 0) {
        let temp = items.filter(i => i.x < beam.x && i.y === beam.y);
        if (temp.length > 0) item = temp[temp.length - 1];
      }
      else if (beam.dir.x > 0) {
        let temp = items.filter(i => i.x > beam.x && i.y === beam.y);
        if (temp.length > 0) item = temp[0];
      }
      else if (beam.dir.y < 0) {
        let temp = items.filter(i => i.x === beam.x && i.y < beam.y);
        if (temp.length > 0) item = temp[temp.length - 1];
      }
      else if (beam.dir.y > 0) {
        let temp = items.filter(i => i.x === beam.x && i.y > beam.y);
        if (temp.length > 0) item = temp[0];
      }
      let length: number = 0;
      if (!item) {
        if (beam.dir.x < 0) length = beam.x + 1;
        else if (beam.dir.x > 0) length = width - beam.x;
        else if (beam.dir.y < 0) length = beam.y + 1;
        else if (beam.dir.y > 0) length = height - beam.y;
      }
      else length = Math.abs(item.x - beam.x + item.y - beam.y);
      for (let i = 0; i < length; i++) history.push((beam.x + beam.dir.x * i) + "," + (beam.y + beam.dir.y * i) + "," + beam.dir.x + "," + beam.dir.y);
      if (!item) return move(beams.slice(1), items, history);
      return move([...turn(beamify(item.x, item.y, beam.dir.x, beam.dir.y), item.type), ...beams.slice(1)], items, history);
    }
    return history;
  }
  function turn(beam: BeamM, type: string): Array<BeamM> {
    if (type === "/") return [beamify(beam.x, beam.y, -beam.dir.y, -beam.dir.x)];
    if (type === "L") return [beamify(beam.x, beam.y, beam.dir.y, beam.dir.x)];
    if (type === "|") {
      if (beam.dir.x === 0) return [beam];
      return [beamify(beam.x, beam.y, 0, -1), beamify(beam.x, beam.y, 0, 1)];
    }
    if (beam.dir.y === 0) return [beam];
    return [beamify(beam.x, beam.y, -1, 0), beamify(beam.x, beam.y, 1, 0)];
  }
  function beamify(x: number, y: number, dx: number, dy: number): BeamM {
    return { x: x, y: y, dir: { x: dx, y: dy }, key: x + "," + y + "," + dx + "," + dy };
  };

  return (
    <div className='day-sixteen'>
      <p>Day sixteen: Part 1</p>
      <h1>Answer: {calculate(data, true)}</h1>
      <h2>Example: {calculate(exampleData, true)}</h2>
      <p>Part 2</p>
      <h1>Answer: {calculate(data, false)}</h1>
      <h2>Example: {calculate(exampleData, false)}</h2>
    </div>
  );
}

export default DaySixteen;
//