import { dayTwentyData } from './data';
import { dayTwentyExample } from './example_data';

function DayTwenty() {
  const data: Array<string> = dayTwentyData.split(/\r?\n/);
  const exampleData: Array<string> = dayTwentyExample.split(/\r?\n/);

  /**
   * Part 1: time 00:00:00 - rank 0000
   * Part 2: time 00:00:00 - rank 0000
   */

  function calculate(a: Array<string>, partOne: boolean): string {
    if (partOne)
      return "";
    return "";
  }

  return (
    <div className='day-twenty'>
      <p>Day twenty: Part 1</p>
      <h1>Answer: {calculate(data, true)}</h1>
      <h2>Example: {calculate(exampleData, true)}</h2>
      <p>Part 2</p>
      <h1>Answer: {calculate(data, false)}</h1>
      <h2>Example: {calculate(exampleData, false)}</h2>
    </div>
  );
}

export default DayTwenty;
