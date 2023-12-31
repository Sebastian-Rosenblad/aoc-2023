import { dayTwentyData } from './data';
import { dayTwentyExampleOne, dayTwentyExampleTwo } from './example_data';

interface ModuleM {
  label: string;
  destinations: Array<string>;
  type: string;
  state: boolean;
  inputs: Array<PulseM>;
}
interface PulseM {
  from: string;
  to: string;
  high: boolean;
}

function DayTwenty() {
  const data: Array<string> = dayTwentyData.split(/\r?\n/);
  let dictionary: { [key: string]: ModuleM };

  /**
   * Part 1: time     >24h - rank 21305
   * Part 2: time 00:00:00 - rank 0000
   */

  function calculate(a: Array<string>, partOne: boolean): string {
    let time: number = Date.now();
    let modules: Array<ModuleM> = Parse(a);
    dictionary = {};
    modules.forEach(module => dictionary[module.label] = module);
    console.log(modules);
    if (partOne) return PressButton(modules, 1000) + " (" + (Date.now() - time) + ")";
    return "";
  }
  function Parse(a: Array<string>): Array<ModuleM> {
    let modules: Array<ModuleM> = a.map(line => {
      const temp: Array<string> = line.split(" -> ");
      const type: string = temp[0][0];
      let module: ModuleM = {
        label: type === 'b' ? temp[0] : temp[0].slice(1),
        destinations: temp[1].split(", "),
        type: type,
        state: false,
        inputs: []
      };
      return module;
    });
    modules.filter(module => module.type === '&').forEach(module => {
      module.inputs = modules.filter(m => m.destinations.includes(module.label)).map(m => { return { from: '', to: m.label, high: false }; })
    });
    return modules;
  }
  function PressButton(modules: Array<ModuleM>, amout: number): number {
    let cycles: Array<{ key: string; low: number; high: number; }> = [];
    do {
      cycles.push({
        key: ModulesKey(modules), low: 0, high: 0
      });
      console.log(cycles[cycles.length - 1].key);
      let total: Array<number> = [0, 0];
      let pulses: Array<PulseM> = [{ from: 'button', to: 'broadcaster', high: false }];
      while (pulses.length > 0) {
        const pulse: PulseM | undefined = pulses.shift();
        if (pulse !== undefined) {
          total[pulse.high ? 1 : 0] += 1;
          //console.log(pulse);
          let module: ModuleM = dictionary[pulse.to];
          if (module) {
            if (module.type === "%") {
              if (!pulse.high) {
                module.state = !module.state;
                module.destinations.forEach(destination => pulses.push({ from: module.label, to: destination, high: module.state }));
              }
            }
            else if (module.type === "&") {
              module.inputs.forEach(input => {
                if (input.to === pulse.from) input.high = pulse.high;
              });
              //console.log(JSON.stringify(module.inputs));
              if (module.inputs.filter(input => !input.high).length === 0)
                module.destinations.forEach(destination => pulses.push({ from: module.label, to: destination, high: false }));
              else module.destinations.forEach(destination => pulses.push({ from: module.label, to: destination, high: true }));
            }
            else {
              module.destinations.forEach(destination => pulses.push({ from: module.label, to: destination, high: pulse.high }));
            }
          }
        }
      }
      cycles[cycles.length - 1].low = total[0];
      cycles[cycles.length - 1].high = total[1];
    } while (cycles.findIndex(cycle => cycle.key === ModulesKey(modules)) < 0 && cycles.length < amout);
    let total: Array<number> = [0, 0];
    const min: number = Math.floor(1000 / cycles.length);
    cycles.forEach((cycle, i) => {
      total[0] += cycle.low * min;
      total[1] += cycle.high * min;
    });
    return total[0] * total[1];
  }
  function ModulesKey(modules: Array<ModuleM>): string {
    return modules.map(module => module.type === "&" ? module.inputs.map(input => input.high ? "H" : "L").join("") : (module.state ? "F" : "T")).join("");
  }

  return (
    <div className='day-twenty'>
      <p>Day twenty: Part 1</p>
      <h1>Answer: {calculate(data, true)}</h1>
      <h2>Example: {calculate(dayTwentyExampleOne.split(/\r?\n/), true)}</h2>
      <h2>Example: {calculate(dayTwentyExampleTwo.split(/\r?\n/), true)}</h2>
      <p>Part 2</p>
      <h1>Answer: {calculate(data, false)}</h1>
      <h2>Example: {calculate(dayTwentyExampleOne.split(/\r?\n/), false)}</h2>
    </div>
  );
}

export default DayTwenty;
/**
 * 
 */