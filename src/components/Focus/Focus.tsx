import classNames from 'classnames';
import { useRecoilValue } from 'recoil';
import { FocusIcon } from '../../icons';
import { appIntervals, IIntervals, totalPomodorosState, totalTimeState } from '../../store';
import styles from './focus.module.scss';

interface IFocusProps {
  period: string;
}

export function Focus({ period }: IFocusProps) {

  const totalTime = useRecoilValue(totalTimeState)[period] || 0;
  const totalPomodoros = useRecoilValue(totalPomodorosState)[period];
  const workInterval = useRecoilValue<IIntervals>(appIntervals).work;
  const focusIndex = Math.floor(totalPomodoros * workInterval / totalTime * 100) || 0;

  const classes = classNames(styles.wrapper, {
    [styles.noData]: !totalPomodoros
  })

  return (
    <div className={classes}>
      <div>
        <h3 className={styles.title}>Фокус</h3>
        <p className={styles.data}>{focusIndex}%</p>
      </div>
      <FocusIcon />
    </div>
  );
}
