import { useRecoilValue } from 'recoil';
import { NoDataPomodoroIcon, PomodoroIcon } from '../../icons';
import { totalPomodorosState } from '../../store';
import styles from './pomodoroscount.module.scss';

interface IPomodorosCountProps {
  period: string;
}

export function PomodorosCount({ period }: IPomodorosCountProps) {

  const pomodoros = useRecoilValue(totalPomodorosState)[period] || 0;

  const pomodorosDisplay = () => {
    if (pomodoros.toString().endsWith('1') && pomodoros !== 11) return <span>{pomodoros} помидор</span>
    if (pomodoros === 12 || pomodoros === 13 || pomodoros === 14) return <span>{pomodoros} помидоров</span>
    if (pomodoros.toString().endsWith('2') || pomodoros.toString().endsWith('3') || pomodoros.toString().endsWith('4')) return <span>{pomodoros} помидора</span>
    return <span>{pomodoros} помидоров</span>
  }

  return (
    <div className={styles.wrapper}>
      {pomodoros < 1 && (
        <NoDataPomodoroIcon />
      )}
      {pomodoros > 0 && (
        <>
          <div className={styles.picture}>
            <PomodoroIcon />
            <span>x {pomodoros}</span>
          </div>
          <div className={styles.text}>
            {pomodorosDisplay()}
          </div>
        </>
      )}
    </div>
  );
}
