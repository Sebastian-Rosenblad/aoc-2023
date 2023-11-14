const fs = require('fs');
const path = require('path');

const componentName = process.argv[2];
const kebabCase = componentName.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
const camelCase = componentName[0].toLocaleLowerCase() + componentName.slice(1);
const componentDir = `./src/days/${componentName}`;

if (!fs.existsSync(componentDir)) {
  fs.mkdirSync(componentDir, { recursive: true });

  const componentContent = `import { useState } from 'react';
import './${componentName}.scss';
import { ${camelCase}Data } from './data';
import { ${camelCase}Example } from './example_data';

function ${componentName}() {
  const data: Array<string> = dayOneData.split(/\\r?\\n/);
  const exampleData: Array<string> = dayOneExample.split(/\\r?\\n/);
  const [answer, setAnswer] = useState<string>("");

  return (
    <div className='${kebabCase}'>
      <h1>{answer}</h1>
    </div>
  );
}

export default ${componentName};
`;
  const styleContent = `.${kebabCase} {}
`;

  fs.writeFileSync(path.join(componentDir, `${componentName}.tsx`), componentContent);
  fs.writeFileSync(path.join(componentDir, `${componentName}.scss`), styleContent);
  fs.writeFileSync(path.join(componentDir, 'data.tsx'), `export const ${camelCase}Data:string=\`\`;`);
  fs.writeFileSync(path.join(componentDir, 'example_data.tsx'), `export const ${camelCase}Example:string=\`\`;`);
}
