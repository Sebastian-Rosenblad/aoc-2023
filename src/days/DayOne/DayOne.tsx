import { useState } from 'react';
import './DayOne.scss';
import { dayOneData } from './data';
import { dayOneExample } from './example_data';

function DayOne() {
  const data: Array<string> = dayOneData.split(/\r?\n/);
  const exampleData: Array<string> = dayOneExample.split(/\r?\n/);
  const [answer, setAnswer] = useState<string>("");

  return (
    <div className='day-one'>
      <h1>{answer}</h1>
    </div>
  );
}

export default DayOne;
