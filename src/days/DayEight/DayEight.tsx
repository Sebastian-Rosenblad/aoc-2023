import { dayEightData } from './data';
import { dayEightExamplePartOne, dayEightExamplePartTwo } from './example_data';

interface NodeM {
  id: string;
  left: string;
  right: string;
}

function DayEight() {
  const data: Array<string> = dayEightData.split(/\r?\n/);

  /**
   * Part 1: time 00:29:40 - rank 7930
   * Part 2: time 02:44:41 - rank 10830
   */

  function calculate(a: Array<string>, partOne: boolean): string {
    const instructions: string = a[0];
    const nodes: Array<NodeM> = a.slice(2).map(line => {
      return {
        id: line.split(" =")[0],
        left: line.split("= (")[1].split(", ")[0],
        right: line.split("= (")[1].split(", ")[1].slice(0,3),
      }
    });
    let pointers: Array<any> = nodes.map(node => {
      return { id: node.id }
    });
    pointers.forEach((pointer, i) => {
      pointer.con = [pointers.find(p => p.id === nodes[i].left), pointers.find(p => p.id === nodes[i].right)];
    });
    if (partOne) {
      let steps: number = 0, node: any = pointers.find(point => point.id === "AAA");
      while (node.id !== "ZZZ") {
        const turn: number = instructions[steps++ % instructions.length] === "L" ? 0 : 1;
        node = node.con[turn];
      }
      return steps.toString();
    }
    let steps: number = 0, paths: Array<any> = pointers.filter(point => point.id[2] === "A");
    while (paths.filter(path => typeof path !== "number").length > 0) {
      for (let i = 0; i < paths.length; i++) {
        if (typeof paths[i] === "number") continue;
        if (paths[i].id[2] === "Z") paths[i] = steps;
        if (typeof paths[i] === "number") continue;
        paths[i] = paths[i].con[instructions[steps % instructions.length] === "L" ? 0 : 1];
      }
      steps++;
    }
    return paths.reduce((a: number, b: number) => lcm(a, b), 1).toString();
  }
  let lcm = (a: number, b: number): number => (a / gcd(a, b)) * b;
  function gcd(a: number, b: number): number {
    let n: number = 0;
    if (a < b) {
      n = b;
      b = a;
      a = n;
    }
    n = a % b;
    return n ? gcd(b, n) : b;
  }

  return (
    <div className='day-eight'>
      <p>Day eight: Part 1</p>
      <h1>Answer: {calculate(data, true)}</h1>
      <h2>Example: {calculate(dayEightExamplePartOne.split(/\r?\n/), true)}</h2>
      <p>Part 2</p>
      <h1>Answer: {calculate(data, false)}</h1>
      <h2>Example: {calculate(dayEightExamplePartTwo.split(/\r?\n/), false)}</h2>
    </div>
  );
}

export default DayEight;
