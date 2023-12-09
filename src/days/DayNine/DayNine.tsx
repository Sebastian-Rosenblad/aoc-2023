import { dayNineData } from './data';
import { dayNineExample } from './example_data';

function DayNine() {
  const data: Array<string> = dayNineData.split(/\r?\n/);
  const exampleData: Array<string> = dayNineExample.split(/\r?\n/);

  /**
   * Part 1: time 00:12:47 - rank 1953
   * Part 2: time 00:16:11 - rank 1745
   */

  function calculate(a: Array<string>, partOne: boolean): string {
    const series: Array<Array<number>> = a.map(line => line.split(" ").map(n => parseInt(n)));
    if (partOne)
      return series.map(serie => findNext(serie)).reduce((a, b) => a + b, 0).toString();
    return series.map(serie => findFirst(serie)).reduce((a, b) => a + b, 0).toString();
  }
  function findNext(serie: Array<number>): number {
    let newSerie: Array<number> = [];
    for (let i = 1; i < serie.length; i++) newSerie.push(serie[i] - serie[i - 1]);
    if (newSerie.filter(n => n === newSerie[0]).length === newSerie.length) return serie[serie.length - 1] + newSerie[0];
    return serie[serie.length - 1] + findNext(newSerie);
  }
  function findFirst(serie: Array<number>): number {
    let newSerie: Array<number> = [];
    for (let i = 1; i < serie.length; i++) newSerie.push(serie[i] - serie[i - 1]);
    if (newSerie.filter(n => n === newSerie[0]).length === newSerie.length) return serie[0] - newSerie[0];
    return serie[0] - findFirst(newSerie);
  }

  return (
    <div className='day-nine'>
      <p>Day nine: Part 1</p>
      <h1>Answer: {calculate(data, true)}</h1>
      <h2>Example: {calculate(exampleData, true)}</h2>
      <p>Part 2</p>
      <h1>Answer: {calculate(data, false)}</h1>
      <h2>Example: {calculate(exampleData, false)}</h2>
    </div>
  );
}

export default DayNine;
