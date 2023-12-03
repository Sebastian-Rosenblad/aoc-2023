import './DayFour.scss';
import { dayFourData } from './data';
import { dayFourExample } from './example_data';

function DayFour() {
  const data: Array<string> = dayFourData.split(/\r?\n/);
  const exampleData: Array<string> = dayFourExample.split(/\r?\n/);

  function calculate(a: Array<string>, partOne: boolean): string {
    if (partOne)
      return "";
    return "";
  }

  return (
    <div className='day-four'>
      <p>Day four: Part 1</p>
      <h1>Answer: {calculate(data, true)}</h1>
      <h2>Example: {calculate(exampleData, true)}</h2>
      <p>Part 2</p>
      <h1>Answer: {calculate(data, false)}</h1>
      <h2>Example: {calculate(exampleData, false)}</h2>
    </div>
  );
}

export default DayFour;
