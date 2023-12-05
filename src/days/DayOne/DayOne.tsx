import { dayOneData } from './data';
import { dayOneExampleOne, dayOneExampleTwo } from './example_data';

function DayOne() {
  const data: Array<string> = dayOneData.split(/\r?\n/);

  /**
   * Part 1: time 00:10:51 - rank 5313
   * Part 2: time 00:58:10 - rank 6612
   */

  function calculate(a: Array<string>, partOne: boolean): string {
    if (partOne)
      return a.map(line => findCalibration(line)).reduce((a, b) => a + b, 0).toString();
    return a.map(line => findTrueCalibration(line)).reduce((a, b) => a + b, 0).toString();
  }
  function findCalibration(line: string): number {
    const r: RegExp = /\d+/g;
    let digits: string = line.match(r)?.reduce((a, b) => a + b, "") || "0";
    return parseInt(digits[0] + digits[digits.length - 1]);
  }
  function findTrueCalibration(line: string): number {
    const r: RegExp = /(?:one|two|three|four|five|six|seven|eight|nine|\d+)/;
    let first: string = line.match(r)?.map(digit => toDigit(digit))[0].slice(0, 1) || "0";
    let i: number = line.length - 1;
    while (!line.slice(i).match(r)) i--;
    let last: string = line.slice(i).match(r)?.map(digit => toDigit(digit))[0] || "0";
    return parseInt(first + last);
  }
  function toDigit(word: string): string {
    switch (word) {
      case "one": return "1";
      case "two": return "2";
      case "three": return "3";
      case "four": return "4";
      case "five": return "5";
      case "six": return "6";
      case "seven": return "7";
      case "eight": return "8";
      case "nine": return "9";
      default: return word;
    }
  }

  return (
    <div className='day-one'>
      <p>Day one: Part 1</p>
      <h1>Answer: {calculate(data, true)}</h1>
      <h2>Example: {calculate(dayOneExampleOne.split(/\r?\n/), true)}</h2>
      <p>Part 2</p>
      <h1>Answer: {calculate(data, false)}</h1>
      <h2>Example: {calculate(dayOneExampleTwo.split(/\r?\n/), false)}</h2>
    </div>
  );
}

export default DayOne;
