import './DayTwo.scss';
import { dayTwoData } from './data';
import { dayTwoExample } from './example_data';

function DayTwo() {
  const data: Array<string> = dayTwoData.split(/\r?\n/);
  const exampleData: Array<string> = dayTwoExample.split(/\r?\n/);

  function calculate(a: Array<string>, partOne: boolean): string {
    if (partOne)
      return a.map(line => scorePartOne(line)).reduce((a, b) => a + b, 0).toString();
    return a.map(line => scorePartTwo(line)).reduce((a, b) => a + b, 0).toString();
  }
  function scorePartOne(line: string): number {
    const chart: Array<Array<number>> = [[3,0,6], [6,3,0], [0,6,3]];
    const yourScore = line[2].charCodeAt(0) - 87;
    const opponentScore = line[0].charCodeAt(0) - 64;
    const resultScore = chart[yourScore - 1][opponentScore - 1];
    return yourScore + resultScore;
  }
  function scorePartTwo(line: string): number {
    const chart: Array<Array<number>> = [[3,1,2], [1,2,3], [2,3,1]];
    const resultScore = line[2].charCodeAt(0) - 87;
    const opponentScore = line[0].charCodeAt(0) - 64;
    const yourScore = chart[opponentScore - 1][resultScore - 1];
    return yourScore + (resultScore - 1) * 3;
  }

  return (
    <div className='day-two'>
      <p>Day two: Part 1</p>
      <h1>Answer: {calculate(data, true)}</h1>
      <h2>Example: {calculate(exampleData, true)}</h2>
      <p>Part 2</p>
      <h1>Answer: {calculate(data, false)}</h1>
      <h2>Example: {calculate(exampleData, false)}</h2>
    </div>
  );
}

export default DayTwo;
