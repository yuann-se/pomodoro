import { PomodorosCount } from '../PomodorosCount';
import { Select } from './Select';
import styles from './statistics.module.scss';
import { BarGraph } from '../BarGraph';
import { TotalTime } from '../TotalTime';
import { useState } from 'react';

const date = new Date();
const month = date.getMonth();
const monthDay = date.getDate();
const weekDay = date.getDay();

export function Statistics() {

  const [selectedDay, setSelectedDay] = useState<number>(weekDay);
  const period = `${month}&${monthDay - (weekDay - selectedDay)}`;

  const setDay = (num: number) => {
    setSelectedDay(num);
  }

  return (
    <main className={styles.container}>
      <div className={styles.titleBlock}>
        <h2 className={styles.sectionTitle}>Ваша активность</h2>
        <Select />
      </div>
      <TotalTime selectedDay={selectedDay} period={period} />
      <PomodorosCount period={period} />
      <BarGraph selectedDay={selectedDay} setDay={setDay} month={month} monthDay={monthDay} weekDay={weekDay} />
    </main>
  );
}
