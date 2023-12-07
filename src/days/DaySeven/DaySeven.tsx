import { daySevenData } from './data';
import { daySevenExample } from './example_data';

interface HandM {
  bid: number;
  score: number;
}

function DaySeven() {
  const data: Array<string> = daySevenData.split(/\r?\n/);
  const exampleData: Array<string> = daySevenExample.split(/\r?\n/);

  /**
   * Part 1: time 00:45:06 - rank 4829
   * Part 2: time 00:50:21 - rank 2762
   */

  function calculate(a: Array<string>, partOne: boolean): string {
    let hands: Array<HandM> = a.map(line => {
      return {
        bid: parseInt(line.split(" ")[1]),
        score: findScore(line.split(" ")[0], !partOne)
      };
    });
    return hands.sort((a, b) => a.score - b.score).map((hand, i) => hand.bid * (i + 1)).reduce((a, b) => a + b, 0).toString();
  }
  function findScore(hand: string, joker: boolean): number {
    const types: Array<string> = joker ? ["A","K","Q","T","9","8","7","6","5","4","3","2","J"] : ["A","K","Q","J","T","9","8","7","6","5","4","3","2"];
    let amount: Array<number> = new Array(types.length).fill(0);
    for (let i = 0; i < hand.length; i++) amount[types.indexOf(hand[i])] += 1;
    if (joker) {
      let jokers: number = amount[types.indexOf("J")];
      amount[types.indexOf("J")] = 0;
      amount[amount.indexOf(Math.max(...amount))] += jokers;
    }
    let score: string = initalScore(amount);
    for (let i = 0; i < hand.length; i++) score += 30 - types.indexOf(hand[i]);
    return parseInt(score);
  }
  function initalScore(amount: Array<number>): string {
    if (amount.includes(5)) return "7";
    if (amount.includes(4)) return "6";
    if (amount.includes(3) && amount.includes(2)) return "5";
    if (amount.includes(3)) return "4";
    if (amount.filter(num => num === 2).length === 2) return "3";
    if (amount.includes(2)) return "2";
    return "1";
  }

  return (
    <div className='day-seven'>
      <p>Day seven: Part 1</p>
      <h1>Answer: {calculate(data, true)}</h1>
      <h2>Example: {calculate(exampleData, true)}</h2>
      <p>Part 2</p>
      <h1>Answer: {calculate(data, false)}</h1>
      <h2>Example: {calculate(exampleData, false)}</h2>
    </div>
  );
}

export default DaySeven;
