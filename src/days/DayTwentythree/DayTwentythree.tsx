import { dayTwentythreeData } from './data';
import { dayTwentythreeExample } from './example_data';

interface TrailM {
  id: string;
  start: CoordM;
  end: CoordM;
  length: number;
  splits: Array<CoordM>;
  splitTrails: Array<TrailM>;
}
interface TrailStartM {
  from: CoordM;
  start: CoordM;
}
interface TreckM {
  trails: Array<TrailM>;
  complete: boolean;
}
interface CoordM {
  x: number;
  y: number;
}

function DayTwentythree() {
  const data: Array<string> = dayTwentythreeData.split(/\r?\n/);
  const exampleData: Array<string> = dayTwentythreeExample.split(/\r?\n/);

  /**
   * Part 1: time     >24h - rank 17155
   * Part 2: time 00:00:00 - rank 0000
   */

  function calculate(a: Array<string>, partOne: boolean): string {
    const time: number = Date.now();
    const map: Array<Array<string>> = a.map(line => line.split(""));
    const start: number = map[0].indexOf(".");
    let trails: Array<TrailM> = [], starts: Array<TrailStartM> = [{ from: { x: start, y: 0 }, start: { x: start, y: 1 } }];
    while (starts.length > 0) {
      const origin: TrailStartM | undefined = starts.shift();
      if (origin !== undefined && !trails.find(trail => Equals(trail.start, origin.start))) {
        const newTrail: TrailM = FindTrail(origin.from, origin.start, trails.length, map);
        trails.push(newTrail);
        newTrail.splits.forEach(split => starts.push({ from: newTrail.end, start: split }));
      }
    }
    trails.forEach(trail => trail.splitTrails = trail.splits.map(coord =>  trails.find(t => Equals(t.start, coord)) || { id: "-1" } as TrailM).filter(t => t.id !== "-1"));
    let trecks: Array<TreckM> = [{ trails: [trails[0]], complete: false }];
    while (trecks.find(treck => !treck.complete)) {
      let treck: TreckM | undefined = trecks.find(t => !t.complete);
      if (treck !== undefined) {
        let splits: Array<TrailM> = treck.trails[treck.trails.length - 1].splitTrails;
        if (splits.length === 0) treck.complete = true;
        else {
          for (let i = 1; i < splits.length; i++) {
            trecks.push({
              trails: [...treck.trails, splits[i]],
              complete: false
            });
          }
          treck.trails.push(splits[0]);
        }
      }
    }
    return Math.max(...trecks.map(treck => treck.trails.reduce((a, b) => a + b.length, 0))) + " (" + (Date.now() - time) + ")";
  }
  function FindTrail(from: CoordM, start: CoordM, index: number, map: Array<Array<string>>): TrailM {
    let walked: Array<CoordM> = [from], nexts: Array<CoordM> = [start];
    while (nexts.length === 1) {
      const next: CoordM = nexts[0];
      nexts = [];
      for (let i = 0; i < 4; i++) {
        const test: CoordM = { x: next.x + (2 - i) % 2, y: next.y + (i - 1) % 2 };
        if (Equals(test, walked[walked.length - 1])) continue;
        if (test.y >= map.length) continue;
        if (map[test.y][test.x] === "#") continue;
        if (map[test.y][test.x] === ">" && i !== 1) continue;
        if (map[test.y][test.x] === "v" && i !== 2) continue;
        nexts.push(test);
      }
      walked.push(next);
    }
    return {
      id: index.toString(),
      start: start,
      end: walked[walked.length - 1],
      length: walked.length - 1,
      splits: nexts,
      splitTrails: []
    };
  }
  function Equals(a: CoordM, b: CoordM): boolean {
    return a.x === b.x && a.y === b.y;
  }

  return (
    <div className='day-twentythree'>
      <p>Day twentythree: Part 1</p>
      <h1>Answer: {calculate(data, true)}</h1>
      <h2>Example: {calculate(exampleData, true)}</h2>
      <p>Part 2</p>
      <h1>Answer: {calculate(data, false)}</h1>
      <h2>Example: {calculate(exampleData, false)}</h2>
    </div>
  );
}

export default DayTwentythree;
