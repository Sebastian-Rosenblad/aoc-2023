import { dayFourteenData } from './data';
import { dayFourteenExample } from './example_data';

interface CoordsM {
  x: number;
  y: number;
}

function DayFourteen() {
  const data: Array<string> = dayFourteenData.split(/\r?\n/);
  const exampleData: Array<string> = dayFourteenExample.split(/\r?\n/);

  /**
   * Part 1: time 00:18:36 - rank 2977
   * Part 2: time 00:00:00 - rank 0000
   */

  function calculate(a: Array<string>, partOne: boolean): string {
    let rocks: Array<CoordsM> = [], beams: Array<CoordsM> = [], height: number = a.length;
    for (let x = 0; x < a[0].length; x++) {
      for (let y = 0; y < a.length; y++) {
          if (a[y][x] === "O") rocks.push({ x: x, y: y });
          else if (a[y][x] === "#") beams.push({ x: x, y: y });
      }
    }
    if (partOne)
      return slide(rocks, beams).map(rock => height - rock.y).reduce((a, b) => a + b, 0).toString();
    return "";
  }
  function slide(rocks: Array<CoordsM>, beams: Array<CoordsM>): Array<CoordsM> {
    let slid: Array<CoordsM> = [];
    rocks.forEach(rock => {
      let above: Array<number> = [...slid.filter(r => isAbove(r, rock)), ...beams.filter(r => isAbove(r, rock))].map(r => r.y);
      slid.push({ x: rock.x, y: above.length === 0 ? 0 : Math.max(...above) + 1 });
    });
    return slid;
  }
  function isAbove(a: CoordsM, b: CoordsM): boolean {
    return a.x === b.x && a.y < b.y;
  }

  return (
    <div className='day-fourteen'>
      <p>Day fourteen: Part 1</p>
      <h1>Answer: {calculate(data, true)}</h1>
      <h2>Example: {calculate(exampleData, true)}</h2>
      <p>Part 2</p>
      <h1>Answer: {calculate(data, false)}</h1>
      <h2>Example: {calculate(exampleData, false)}</h2>
    </div>
  );
}

export default DayFourteen;
