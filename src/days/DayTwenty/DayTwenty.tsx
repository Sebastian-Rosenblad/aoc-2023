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
interface ConjunctionM {
  label: string;
  value: number;
}

function DayTwenty() {
  const data: Array<string> = dayTwentyData.split(/\r?\n/);
  let dictionary: { [key: string]: ModuleM };

  /**
   * Part 1: time     >24h - rank 21305
   * Part 2: time     >24h - rank 17277
   */

  function calculate(a: Array<string>, partOne: boolean): string {
    let time: number = Date.now();
    let modules: Array<ModuleM> = Parse(a);
    dictionary = {};
    modules.forEach(module => dictionary[module.label] = module);
    return PressButton(modules, 1000, partOne) + " (" + (Date.now() - time) + ")";
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
      module.inputs = modules.filter(m => m.destinations.includes(module.label)).map(m => {
        return { from: m.label, to: '', high: false };
      });
    });
    return modules;
  }
  function PressButton(modules: Array<ModuleM>, amout: number, partOne: boolean): number {
    let cycles: Array<{ key: string; low: number; high: number; }> = [];
    let flops: Array<ConjunctionM> = FindFlops(modules, "rx");
    do {
      cycles.push({ key: ModulesKey(modules), low: 0, high: 0 });
      let total: Array<number> = [0, 0];
      let pulses: Array<PulseM> = [{ from: 'button', to: 'broadcaster', high: false }];
      while (pulses.length > 0) {
        const pulse: PulseM | undefined = pulses.shift();
        if (pulse !== undefined) {
          total[pulse.high ? 1 : 0] += 1;
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
                if (input.from === pulse.from) input.high = pulse.high;
              });
              if (module.inputs.filter(input => !input.high).length === 0)
                module.destinations.forEach(destination => pulses.push({ from: module.label, to: destination, high: false }));
              else module.destinations.forEach(destination => pulses.push({ from: module.label, to: destination, high: true }));
            }
            else {
              module.destinations.forEach(destination => pulses.push({ from: module.label, to: destination, high: pulse.high }));
            }
            if (!partOne && !pulse.high && flops.find(flop => flop.label === pulse.to)) {
              modules.filter(module => module.label === pulse.to).forEach(module => {
                if (!module.state) {
                  flops = flops.map(flop => flop.label === pulse.to && flop.value < 0 ? { label: flop.label, value: cycles.length } : flop);
                }
              });
              if (!flops.find(flop => flop.value < 0)) return flops.map(flop => flop.value).reduce((a, b) => a * b, 1);
            }
          }
        }
      }
      if (partOne) {
        cycles[cycles.length - 1].low = total[0];
        cycles[cycles.length - 1].high = total[1];
      }
    } while (cycles.findIndex(cycle => cycle.key === ModulesKey(modules)) < 0 && (cycles.length < amout || !partOne));
    let total: Array<number> = [0, 0];
    const min: number = Math.floor(1000 / cycles.length);
    cycles.forEach(cycle => {
      total[0] += cycle.low * min;
      total[1] += cycle.high * min;
    });
    return total[0] * total[1];
  }
  function ModulesKey(modules: Array<ModuleM>): string {
    return modules.map(module => module.type === "&" ? module.inputs.map(input => input.high ? "H" : "L").join("") : (module.state ? "F" : "T")).join("");
  }
  function FindFlops(modules: Array<ModuleM>, destination: string): Array<ConjunctionM> {
    let conjunction: string = modules.find(module => module.destinations.includes(destination))?.label || "";
    return modules.filter(module => module.destinations.includes(conjunction)).map(module => {
      return { label: module.label, value: -1 };
    });
  }

  return (
    <div className='day-twenty'>
      <p>Day twenty: Part 1</p>
      <h1>Answer: {calculate(data, true)}</h1>
      <h2>Example: {calculate(dayTwentyExampleOne.split(/\r?\n/), true)}</h2>
      <h2>Example: {calculate(dayTwentyExampleTwo.split(/\r?\n/), true)}</h2>
      <p>Part 2</p>
      <h1>Answer: {calculate(data, false)}</h1>
    </div>
  );
}

export default DayTwenty;
