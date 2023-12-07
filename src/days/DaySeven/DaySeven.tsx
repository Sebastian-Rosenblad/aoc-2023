import { daySevenData } from './data';
import { daySevenExample } from './example_data';

interface HandM {
  hand: string;
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
    let hands: Array<HandM> = parse(a);
    hands.forEach(hand => hand.score = findScore(hand));
    if (partOne)
      return hands.sort((a, b) => a.score - b.score).map((hand, i) => hand.bid * (i + 1)).reduce((a, b) => a + b, 0).toString();
    hands.forEach(hand => hand.score = findJokerScore(hand));
    return hands.sort((a, b) => a.score - b.score).map((hand, i) => hand.bid * (i + 1)).reduce((a, b) => a + b, 0).toString();
  }
  function parse(a: Array<string>): Array<HandM> {
    let hands: Array<HandM> = [];
    a.forEach(line => {
      hands.push({
        hand: line.split(" ")[0],
        bid: parseInt(line.split(" ")[1]),
        score: 0
      });
    });
    return hands;
  }
  function findScore(hand: HandM): number {
    let score: string = "1";
    const types: Array<string> = ["A","K","Q","J","T","9","8","7","6","5","4","3","2"];
    let amount: Array<number> = [0,0,0,0,0,0,0,0,0,0,0,0,0];
    for (let i = 0; i < hand.hand.length; i++) amount[types.indexOf(hand.hand[i])] += 1;
    if (amount.includes(5)) score = "7";
    else if (amount.includes(4)) score = "6";
    else if (amount.includes(3) && amount.includes(2)) score = "5";
    else if (amount.includes(3)) score = "4";
    else if (amount.filter(num => num === 2).length === 2) score = "3";
    else if (amount.includes(2)) score = "2";
    for (let i = 0; i < hand.hand.length; i++) score += 30 - types.indexOf(hand.hand[i]);
    return parseInt(score);
  }
  function findJokerScore(hand: HandM): number {
    let score: string = "1";
    const types: Array<string> = ["A","K","Q","T","9","8","7","6","5","4","3","2","J"];
    let amount: Array<number> = [0,0,0,0,0,0,0,0,0,0,0,0,0];
    for (let i = 0; i < hand.hand.length; i++) amount[types.indexOf(hand.hand[i])] += 1;
    let jokers: number = amount[12];
    amount[12] = 0;
    amount[amount.indexOf(Math.max(...amount))] += jokers;
    if (amount.includes(5)) score = "7";
    else if (amount.includes(4)) score = "6";
    else if (amount.includes(3) && amount.includes(2)) score = "5";
    else if (amount.includes(3)) score = "4";
    else if (amount.filter(num => num === 2).length === 2) score = "3";
    else if (amount.includes(2)) score = "2";
    for (let i = 0; i < hand.hand.length; i++) score += 30 - types.indexOf(hand.hand[i]);
    return parseInt(score);
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
