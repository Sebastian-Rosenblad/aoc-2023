import { dayTwoData } from './data';
import { dayTwoExample } from './example_data';

interface GameM {
  id: number,
  sets: Array<SetM>
}
interface SetM {
  red: number;
  green: number;
  blue: number;
}

function DayTwo() {
  const data: Array<string> = dayTwoData.split(/\r?\n/);
  const exampleData: Array<string> = dayTwoExample.split(/\r?\n/);

  /**
   * Part 1: time 00:21:41 - rank 4884
   * Part 2: time 00:25:51 - rank 4251
   */

  function calculate(a: Array<string>, partOne: boolean): string {
    let games: Array<GameM> = a.map((line, i) => {
      return {
        id: parseInt(line.split(":")[0].split(" ")[1]),
        sets: line.split(": ")[1].split("; ").map(set => toSet(set))
      }
    });
    if (partOne)
      return games.filter(game => gamePossible(game)).reduce((a, b) => a + b.id, 0).toString();
    return games.map(game => gamePower(game)).reduce((a, b) => a + b, 0).toString();
  }
  function gamePossible(game: GameM): boolean {
    for (let i = 0; i < game.sets.length; i++) {
      if (game.sets[i].red > 12) return false;
      if (game.sets[i].green > 13) return false;
      if (game.sets[i].blue > 14) return false;
    }
    return true;
  }
  function gamePower(game: GameM): number {
    let least: SetM = { red: 0, green: 0, blue: 0 };
    game.sets.forEach(game => {
      if (game.red > least.red) least.red = game.red;
      if (game.green > least.green) least.green = game.green;
      if (game.blue > least.blue) least.blue = game.blue;
    });
    return least.red * least.green * least.blue;
  }
  function toSet(line: string): SetM {
    let draws: Array<string> = line.split(", ");
    let set: SetM = { red: 0, green: 0, blue: 0 };
    draws.forEach(draw => {
      let item: Array<string> = draw.split(" ");
      switch (item[1]) {
        case "red": set.red += parseInt(item[0]); break;
        case "green": set.green += parseInt(item[0]); break;
        case "blue": set.blue += parseInt(item[0]); break;
        default: break;
      }
    });
    return set;
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
