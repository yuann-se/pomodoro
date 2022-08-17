import { useRecoilValue } from 'recoil';
import { totalTimeState } from '../../store';
import styles from './totaltime.module.scss';

interface ITotalTimeProps {
  selectedDay: number;
  period: string;
}

export function TotalTime({ selectedDay, period }: ITotalTimeProps) {

  const todayName = () => {
    switch (selectedDay) {
      case 0: return 'Воскресенье';
      case 1: return 'Понедельник';
      case 2: return 'Вторник';
      case 3: return 'Среда';
      case 4: return 'Четверг';
      case 5: return 'Пятница';
      case 6: return 'Суббота';
    }
  };

  const totalTime = useRecoilValue(totalTimeState)[period] || 0;

  const displayTime = () => {
    if (totalTime < 60) return <p className={styles.descr}>Нет данных</p>;
    const hours = Math.floor(totalTime / 60 / 60);
    const minutes = Math.floor(totalTime / 60);
    if (hours < 1) return <p className={styles.descr}>Вы работали над задачами в течение <span>{minutes} мин</span></p>
    return <p className={styles.descr}>Вы работали над задачами в течение <span>{hours} ч {minutes} мин</span></p>
  }

  return (
    <div className={styles.today}>
      <h3 className={styles.title}>{todayName()}</h3>
      {displayTime()}
    </div>
  );
}
