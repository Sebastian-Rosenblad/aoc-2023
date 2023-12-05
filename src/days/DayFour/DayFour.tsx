import { dayFourData } from './data';
import { dayFourExample } from './example_data';

interface GameM {
  winning: Array<number>;
  pulled: Array<number>;
}

function DayFour() {
  const data: Array<string> = dayFourData.split(/\r?\n/);
  const exampleData: Array<string> = dayFourExample.split(/\r?\n/);

  /**
   * Part 1: time 00:08:13 - rank 2223
   * Part 2: time 00:16:00 - rank 1384
   */

  function calculate(a: Array<string>, partOne: boolean): string {
    let games: Array<GameM> = a.map(line => {
      return {
        winning: line.split(": ")[1].split(" |")[0].split(" ").filter(word => word !== " " && word !== "").map(word => parseInt(word)),
        pulled: line.split(": ")[1].split("| ")[1].split(" ").filter(word => word !== " " && word !== "").map(word => parseInt(word))
      }
    });
    if (partOne)
      return games.map(game => gamePoints(winningNumbers(game))).reduce((a, b) => a + b, 0).toString();
    let cards: Array<number> = new Array(games.length).fill(1);
    let wins: Array<number> = games.map(game => winningNumbers(game));
    for (let i = 0; i < cards.length; i++) {
      for (let j = 0; j < wins[i]; j++) {
        if (i + j + 1 < cards.length) cards[i + j + 1] += cards[i];
      }
    }
    return cards.reduce((a, b) => a + b, 0).toString();
  }
  function winningNumbers(game: GameM): number {
    let wins: number = 0;
    game.pulled.forEach(pull => {
      if (game.winning.includes(pull)) wins += 1;
    });
    return wins;
  }
  function gamePoints(wins: number): number {
    return wins > 0 ? Math.pow(2, wins - 1) : 0;
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
