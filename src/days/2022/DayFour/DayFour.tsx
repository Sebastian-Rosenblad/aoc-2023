import { dayFourData } from './data';
import { dayFourExample } from './example_data';

interface PairM {
  a: ElfM;
  b: ElfM;
}
interface ElfM {
  start: number;
  end: number;
}

function DayFour() {
  const data: Array<string> = dayFourData.split(/\r?\n/);
  const exampleData: Array<string> = dayFourExample.split(/\r?\n/);

  function calculate(a: Array<string>, partOne: boolean): string {
    const pairs: Array<PairM> = a.map(line => {
      let elfs: Array<ElfM> = line.split(",").map(elf => {
        let sections: Array<number> = elf.split("-").map(section => parseInt(section));
        return { start: sections[0], end: sections[1] } as ElfM;
      });
      return { a: elfs[0], b: elfs[1] };
    });
    if (partOne)
      return pairs.filter(pair => fullyContains(pair)).length.toString();
    return pairs.filter(pair => partiallyContains(pair)).length.toString();
  }
  function fullyContains(pair: PairM): boolean {
    if (pair.a.start >= pair.b.start && pair.a.end <= pair.b.end) return true;
    if (pair.b.start >= pair.a.start && pair.b.end <= pair.a.end) return true;
    return false;
  }
  function partiallyContains(pair: PairM): boolean {
    if (pair.a.start >= pair.b.start && pair.a.start <= pair.b.end) return true;
    if (pair.a.end >= pair.b.start && pair.a.end <= pair.b.end) return true;
    if (pair.b.start >= pair.a.start && pair.b.start <= pair.a.end) return true;
    if (pair.b.end >= pair.a.start && pair.b.end <= pair.a.end) return true;
    return false;
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
