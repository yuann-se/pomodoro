import classNames from 'classnames';
import styles from './clockface.module.scss';

interface IClockFaceProps {
  seconds: number;
  workTheme: boolean;
  breakTheme: boolean;
}

const displayTime = (time: number) => {
  const min = Math.floor(time / 60);
  const sec = time - (60 * min);
  const minStr = min < 10 ? `0${min}` : `${min}`;
  const secStr = sec < 10 ? `0${sec}` : `${sec}`;
  return `${minStr}:${secStr}`
}

export function ClockFace({ seconds, workTheme, breakTheme }: IClockFaceProps) {

  const classes = classNames(styles.counter, {
    [styles.work]: workTheme,
    [styles.break]: breakTheme
  })

  return (
    <div className={classes}>{displayTime(seconds)}</div>
  );
}
