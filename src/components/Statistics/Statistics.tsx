import { PomodorosCount } from '../PomodorosCount';
import { Select } from './Select';
import styles from './statistics.module.scss';
import { BarGraph } from '../BarGraph';
import { TotalTime } from '../TotalTime';
import { Focus } from '../Focus';
import { PauseTime } from '../PauseTime';
import { StopsCount } from '../StopsCount';
import { useRecoilState, useRecoilValue } from 'recoil';
import { selectedDayState, selectedPeriod } from '../../store';

const date = new Date();
const month = date.getMonth();
const monthDay = date.getDate();
let weekDay = date.getDay();
if (weekDay === 0) weekDay = 7;

export const getPeriod = (day: number, week: string) => {
  let dayNum = monthDay - (weekDay - day);
  if (week === 'Прошедшая неделя') dayNum = monthDay - (weekDay - day) - 7;
  if (week === '2 недели назад') dayNum = monthDay - (weekDay - day) - 14;
  if (dayNum < 1) {
    const lastDay = new Date(2022, month, 0).getDate();
    let monthNum = month === 0 ? 11 : month - 1;
    return `${monthNum}&${lastDay - Math.abs(dayNum)}`
  }
  return `${month}&${dayNum}`
}

export function Statistics() {

  const [selectedDay, setSelectedDay] = useRecoilState<number>(selectedDayState);
  const selectedWeek = useRecoilValue<string>(selectedPeriod);

  const period = getPeriod(selectedDay, selectedWeek);

  const setDay = (num: number) => {
    setSelectedDay(num);
  }

  return (
    <main className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.titleBlock}>
          <h2 className={styles.sectionTitle}>Ваша активность</h2>
          <Select />
        </div>
        <TotalTime selectedDay={selectedDay} period={period} />
        <PomodorosCount period={period} />
        <BarGraph selectedDay={selectedDay} selectedWeek={selectedWeek} setDay={setDay} weekDay={weekDay} />
        <Focus period={period} />
        <PauseTime period={period} />
        <StopsCount period={period} />
      </div>
    </main>
  );
}
