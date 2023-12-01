import './DayTwo.scss';
import { dayTwoData } from './data';
import { dayTwoExample } from './example_data';

function DayTwo() {
  const data: Array<string> = dayTwoData.split(/\r?\n/);
  const exampleData: Array<string> = dayTwoExample.split(/\r?\n/);

  function calculate(a: Array<string>, partOne: boolean): string {
    if (partOne)
      return "";
    return "";
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
