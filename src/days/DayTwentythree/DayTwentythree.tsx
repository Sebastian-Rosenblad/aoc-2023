import { useState } from 'react';
import { dayTwentythreeData } from './data';
import { dayTwentythreeExample } from './example_data';

interface TrailM {
  start: CoordM;
  end: CoordM;
  length: number;
  splits: Array<CoordM>;
}
interface CheckM {
  from: CoordM;
  start: CoordM;
}
interface NodeM {
  id: string;
  connections: Array<{ id: string; length: number; }>;
}
interface CoordM {
  x: number;
  y: number;
}

let ids: Array<string> = [];
function GetID(): string {
  let newid: string;
  do { newid = Math.random().toString(16).slice(2, 5); } while (ids.includes(newid));
  return newid;
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
    const startx: number = map[0].indexOf(".");
    let trails: Array<TrailM> = [], checks: Array<CheckM> = [{ from: { x: startx, y: 0 }, start: { x: startx, y: 1 } }];
    while (checks.length > 0) {
      const check: CheckM | undefined = checks.shift();
      if (check !== undefined && !trails.find(trail => Equals(trail.start, check.start))) {
        const newTrail: TrailM = FindTrail(check.from, check.start, map, partOne);
        trails.push(newTrail);
        newTrail.splits.forEach(split => checks.push({ from: newTrail.end, start: split }));
      }
    }
    const minlength: number = trails.filter(trail => trail.splits.length === 0).reduce((a, b) => a + b.length, 0);
    const nodes: Array<NodeM> = GetNodes(trails.filter(trail => !Equals(trail.end, { x: startx, y: 0 })));
    console.log(trails, minlength);
    /*trails.forEach(trail => trail.splitTrails = trail.splits.map(coord =>  trails.find(t => Equals(t.start, coord)) || { id: "-1" } as TrailM).filter(t => t.id !== "-1"));
    let trecks: Array<Array<TrailM>> = [[trails[0]]];
    let completed: Array<Array<TrailM>> = [];
    let count: number = 0;
    let longest: number = 0;
    while (trecks.length > 0) {
      let treck: Array<TrailM> | undefined = trecks.shift();
      if (treck !== undefined) {
        let splits: Array<TrailM> = treck[treck.length - 1].splitTrails;
        if (splits.length === 0) {
          completed.push(treck);
          if (treck.reduce((a, b) => a + b.length, 0) > longest) {
            longest = treck.reduce((a, b) => a + b.length, 0);
            console.log(longest, completed.length, trecks.length);
          }
        }
        for (let i = 0; i < splits.length; i++) {
          if (partOne) trecks.push([...treck, splits[i]]);
          else if (!treck.map(trail => trail.end).find(coord => Equals(coord, splits[i].end))) trecks.push([...treck, splits[i]]);
        }
      }
    }
    console.log("done", trecks.length, completed.length);
    return Math.max(...completed.map(treck => treck.reduce((a, b) => a + b.length, 0))) + " (" + (Date.now() - time) + ")";*/
    return " (" + (Date.now() - time) + ")";
  }
  function FindTrail(from: CoordM, start: CoordM, map: Array<Array<string>>, partOne: boolean): TrailM {
    let walked: Array<CoordM> = [from], nexts: Array<CoordM> = [start];
    while (nexts.length === 1) {
      const next: CoordM = nexts[0];
      nexts = [];
      for (let i = 0; i < 4; i++) {
        const test: CoordM = { x: next.x + (2 - i) % 2, y: next.y + (i - 1) % 2 };
        if (Equals(test, walked[walked.length - 1])) continue;
        if (test.y >= map.length || test.y < 0) continue;
        if (map[test.y][test.x] === "#") continue;
        if (partOne && map[test.y][test.x] === ">" && i !== 1) continue;
        if (partOne && map[test.y][test.x] === "v" && i !== 2) continue;
        nexts.push(test);
      }
      walked.push(next);
    }
    return {
      start: start,
      end: walked[walked.length - 1],
      length: walked.length - 1,
      splits: nexts
    };
  }
  function GetNodes(trails: Array<TrailM>): Array<NodeM> {
    let uniques: Array<CoordM> = trails.map(trail => trail.end);
    uniques = uniques.filter((unique, i) => uniques.findIndex(u => Equals(unique, u)) === i);
    let nodes: Array<NodeM> = [];
    uniques.forEach(unique => {
      const connections: Array<TrailM> = trails.filter(trail => Equals(unique, trail.end));
      console.log(unique, connections);
    });
    return nodes;
  }
  let Equals = (a: CoordM, b: CoordM): boolean => a.x === b.x && a.y === b.y;

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
