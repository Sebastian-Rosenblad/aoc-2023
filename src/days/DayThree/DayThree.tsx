import './DayThree.scss';
import { dayThreeData } from './data';
import { dayThreeExample } from './example_data';

function DayThree() {
  const data: Array<string> = dayThreeData.split(/\r?\n/);
  const exampleData: Array<string> = dayThreeExample.split(/\r?\n/);

  function calculate(a: Array<string>, partOne: boolean): string {
    if (partOne)
      return "";
    return "";
  }

  return (
    <div className='day-three'>
      <p>Day three: Part 1</p>
      <h1>Answer: {calculate(data, true)}</h1>
      <h2>Example: {calculate(exampleData, true)}</h2>
      <p>Part 2</p>
      <h1>Answer: {calculate(data, false)}</h1>
      <h2>Example: {calculate(exampleData, false)}</h2>
    </div>
  );
}

export default DayThree;
