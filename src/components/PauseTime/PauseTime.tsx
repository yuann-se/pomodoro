import classNames from 'classnames';
import { useRecoilValue } from 'recoil';
import { PauseTimeIcon } from '../../icons';
import { ICount, timeOnPauseState } from '../../store';
import styles from './pausetime.module.scss';

interface IPauseTimeProps {
  period: string;
}

export function PauseTime({ period }: IPauseTimeProps) {

  const pauseTime = useRecoilValue<ICount>(timeOnPauseState)[period] || 0;

  const displayTime = () => {
    if (pauseTime < 60) return '0м';
    const hours = Math.floor(pauseTime / 60 / 60);
    const minutes = Math.floor(pauseTime / 60);
    if (hours < 1) return `${minutes}м`
    return `${hours}ч ${minutes}м`
  }

  const classes = classNames(styles.wrapper, {
    [styles.noData]: pauseTime < 60
  })

  return (
    <div className={classes}>
      <div>
        <h3 className={styles.title}>Время на&nbsp;паузе</h3>
        <p className={styles.data}>{displayTime()}</p>
      </div>
      <PauseTimeIcon />
    </div>
  );
}
