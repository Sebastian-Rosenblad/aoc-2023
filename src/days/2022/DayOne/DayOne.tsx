import { dayOneData } from './data';
import { dayOneExample } from './example_data';

function DayOne() {
  const data: Array<string> = dayOneData.split(/\r?\n/);
  const exampleData: Array<string> = dayOneExample.split(/\r?\n/);

  function calculate(a: Array<string>, partOne: boolean): string {
    let calories: Array<number> = [0];
    let i: number = 0;
    a.forEach(line => {
      if (!line)
        calories[++i] = 0;
      else
        calories[i] += parseInt(line);
    });
    if (partOne)
      return calories.sort((a, b) => b - a)[0].toString();
    return calories.sort((a, b) => b - a).slice(0, 3).reduce((a, b) => a + b, 0).toString();
  }

  return (
    <div className='day-one'>
      <p>Day one: Part 1</p>
      <h1>Answer: {calculate(data, true)}</h1>
      <h2>Example: {calculate(exampleData, true)}</h2>
      <p>Part 2</p>
      <h1>Answer: {calculate(data, false)}</h1>
      <h2>Example: {calculate(exampleData, false)}</h2>
    </div>
  );
}

export default DayOne;
