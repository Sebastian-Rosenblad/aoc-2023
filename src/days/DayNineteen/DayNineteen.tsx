import { dayNineteenData } from './data';
import { dayNineteenExample } from './example_data';

interface WorkflowM {
  label: string;
  rules: Array<RuleM>;
  default: string;
}
interface RuleM {
  type: "x" | "m" | "a" | "s";
  comp: ">" | "<";
  value: number;
  result: string;
}
interface PartM {
  x: number;
  m: number;
  a: number;
  s: number;
}

function DayNineteen() {
  const data: Array<string> = dayNineteenData.split(/\r?\n/);
  const exampleData: Array<string> = dayNineteenExample.split(/\r?\n/);
  let dictionary: { [key: string]: WorkflowM };

  /**
   * Part 1: time     >24h - rank 27896
   * Part 2: time 00:00:00 - rank 0000
   */

  function calculate(a: Array<string>, partOne: boolean): string {
    const time: number = Date.now();
    dictionary = {};
    const split: number = a.findIndex(line => line === "");
    const workflows: Array<WorkflowM> = RemoveRedundants(ParseWorkflows(a.slice(0, split)));
    workflows.forEach(workflow => dictionary[workflow.label] = workflow);
    if (partOne) {
      const parts: Array<PartM> = a.slice(split + 1).map(line => {
        const temp: Array<number> = line.slice(1, -1).split(",").map(value => parseInt(value.slice(2)));
        return { x: temp[0], m: temp[1], a: temp[2], s: temp[3] };
      });
      return parts.filter(part => TestPart(part, dictionary["in"])).map(part => part.x + part.m + part.a + part.s).reduce((a, b) => a + b, 0) + " (" + (Date.now() - time) + ")";
    }
    return "(" + (Date.now() - time) + ")";
  }
  function ParseWorkflows(lines: Array<string>): Array<WorkflowM> {
    return lines.map(line => {
      const temp: Array<string> = line.split("{");
      const tempRules: Array<string> = temp[1].slice(0, -1).split(",");
      return {
        label: temp[0],
        rules: tempRules.slice(0, -1).map(rule => {
          return {
            type: rule.split(":")[0].slice(0, 1),
            comp: rule.split(":")[0].slice(1, 2),
            value: parseInt(rule.split(":")[0].slice(2)),
            result: rule.split(":")[1]
          } as RuleM;
        }),
        default: tempRules[tempRules.length - 1]
      };
    });
  }
  function RemoveRedundants(workflows: Array<WorkflowM>): Array<WorkflowM> {
    let redundant: Array<WorkflowM> = [];
    do {
      workflows.forEach(workflow => {
        while (workflow.rules.length > 0 && workflow.rules[workflow.rules.length - 1].result === workflow.default) workflow.rules.pop();
      });
      redundant = workflows.filter(workflow => workflow.rules.length === 0);
      redundant.forEach(red => {
        workflows.forEach(workflow => {
          if (workflow.default === red.label) workflow.default = red.default;
          workflow.rules.forEach(rule => {
            if (rule.result === red.label) rule.result = red.default;
          });
        });
      });
      workflows = workflows.filter(workflow => workflow.rules.length > 0);
    } while(redundant.length > 0);
    return workflows;
  }
  function TestPart(part: PartM, workflow: WorkflowM): boolean {
    for (let i = 0; i < workflow.rules.length; i++) {
      if (TestRule(part, workflow.rules[i])) {
        if (workflow.rules[i].result === "A") return true;
        if (workflow.rules[i].result === "R") return false;
        return TestPart(part, dictionary[workflow.rules[i].result]);
      }
    }
    if (workflow.default === "A") return true;
    if (workflow.default === "R") return false;
    return TestPart(part, dictionary[workflow.default]);
  }
  function TestRule(part: PartM, rule: RuleM): boolean {
    if (rule.comp === "<") return part[rule.type] < rule.value;
    return part[rule.type] > rule.value;
  }

  return (
    <div className='day-nineteen'>
      <p>Day nineteen: Part 1</p>
      <h1>Answer: {calculate(data, true)}</h1>
      <h2>Example: {calculate(exampleData, true)}</h2>
      <p>Part 2</p>
      <h1>Answer: {calculate(data, false)}</h1>
      <h2>Example: {calculate(exampleData, false)}</h2>
    </div>
  );
}

export default DayNineteen;
