import classNames from 'classnames';
import { useRecoilValue } from 'recoil';
import { totalTimeState } from '../../store';
import styles from './bargraph.module.scss';

interface IBarGraphProps {
  selectedDay: number;
  setDay: (val: number) => void;
  month: number;
  monthDay: number;
  weekDay: number;
}

export function BarGraph({ selectedDay, setDay, month, monthDay, weekDay }: IBarGraphProps) {

  const totalTime = useRecoilValue(totalTimeState);

  const namesArr = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
  const dayNames = namesArr.map((item, i) => {
    const ind = i + 1;
    const classes = classNames(styles.text, {
      [styles.active]: selectedDay === ind || (selectedDay === 0 && ind === 7),
      [styles.noData]: ind > weekDay
    });
    return <div
      onClick={() => setDay(ind)}
      key={i}
      className={classes}>
      {item}
    </div>
  });

  const columns = namesArr.map((_, i) => {

    let colHeight: number | undefined;
    const ind = i + 1;
    if (i > 0 && ind <= weekDay) {
      colHeight = totalTime[`${month}&${monthDay - (weekDay - ind)}`];
    };

    const classes = classNames(styles.column, {
      [styles.active]: selectedDay === ind || (selectedDay === 0 && ind === 7),
      [styles.noData]: ind > weekDay
    });


    return <div
      onClick={() => setDay(ind)}
      className={classes}
      style={{ gridColumn: `${i + 2}/${i + 3}`, height: colHeight && colHeight >= 120 ? Math.floor(colHeight / 60 * 3.6) : 5 }}
      key={i}
    ></div>
  });

  const displayTime = (i: number) => {
    if (i > 59) return `${Math.floor(i / 60)} ч ${i - Math.floor(i / 60) * 60} мин`;
    return `${i} мин`
  }

  let rows = [];
  for (let i = 4; i > 0; --i) {
    rows.push(<div className={styles.row} style={{ gridRow: `${5 - i}` }} key={i}>
      <span className={styles.bar}></span>
      <span className={styles.timeline}>{displayTime(25 * (i))}</span>
    </div>)
  };

  return (
    <div className={styles.container}>
      {columns}
      {rows}
      <div className={styles.xAxis}>
        <div></div>
        {dayNames}
      </div>
    </div>
  );
}
