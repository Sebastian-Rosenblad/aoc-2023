import { dayTwelveData } from './data';
import { dayTwelveExample } from './example_data';

interface SpringM {
  damaged: Array<number>;
  condition: string;
}

function DayTwelve() {
  const data: Array<string> = dayTwelveData.split(/\r?\n/);
  const exampleData: Array<string> = dayTwelveExample.split(/\r?\n/);
  let dictionary: { [key: string]: number } = {};

  /**
   * Part 1: time 00:38:20 - rank 2613
   * Part 2: time 07:37:00 - rank 6444
   */

  function calculate(a: Array<string>, partOne: boolean): string {
    let springs: Array<SpringM> = a.map(line => {
      return {
        damaged: line.split(" ")[1].split(",").map(val => parseInt(val)),
        condition: line.split(" ")[0]
      };
    });
    if (partOne)
      return springs.map(spring => arrangements(spring)).reduce((a, b) => a + b, 0).toString();
    return springs.map(spring => arrangements({
      condition: [spring.condition, spring.condition, spring.condition, spring.condition, spring.condition].join("?"),
      damaged: [...spring.damaged, ...spring.damaged, ...spring.damaged, ...spring.damaged, ...spring.damaged]
    })).reduce((a, b) => a + b, 0).toString();
  }
  function arrangements(spring: SpringM): number {
    const key: string = spring.condition + spring.damaged.join(",");
    if (key in dictionary) return dictionary[key];
    if (spring.condition.length === 0) {
      if (spring.damaged.length === 0) return (dictionary[key] = 1);
      return (dictionary[key] = 0);
    }
    if (spring.damaged.length === 0) {
      for (let i = 0; i < spring.condition.length; i++) if (spring.condition[i] === "#") return (dictionary[key] = 0);
      return (dictionary[key] = 1);
    }
    if (spring.condition.length < spring.damaged.reduce((a, b) => a + b, 0) + spring.damaged.length - 1) return (dictionary[key] = 0);
    if (spring.condition[0] === ".") return (dictionary[key] = arrangements({ condition: spring.condition.slice(1), damaged: spring.damaged }));
    if (spring.condition[0] === "#") {
      let damage: number = spring.damaged[0];
      for (let i = 0; i < damage; i++) if (spring.condition[i] === ".") return (dictionary[key] = 0);
      if (spring.condition[damage] === "#") return (dictionary[key] = 0);
      return (dictionary[key] = arrangements({ condition: spring.condition.slice(damage + 1), damaged: spring.damaged.slice(1) }));
    }
    return (dictionary[key] = arrangements({ condition: spring.condition.slice(1), damaged: spring.damaged })
      + arrangements({ condition: "#" + spring.condition.slice(1), damaged: spring.damaged }));
  }

  return (
    <div className='day-twelve'>
      <p>Day twelve: Part 1</p>
      <h1>Answer: {calculate(data, true)}</h1>
      <h2>Example: {calculate(exampleData, true)}</h2>
      <p>Part 2</p>
      <h1>Answer: {calculate(data, false)}</h1>
      <h2>Example: {calculate(exampleData, false)}</h2>
    </div>
  );
}

export default DayTwelve;
