import classNames from 'classnames';
import { useRef, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { currentSeconds, isTimerRunningState, targetTimeState } from '../../../store';
import styles from './clockface.module.scss';

interface IClockFaceProps {
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

export function ClockFace({ workTheme, breakTheme }: IClockFaceProps) {

  const [seconds, setSeconds] = useRecoilState(currentSeconds);
  const [isRunning,] = useRecoilState(isTimerRunningState);
  const [targetTime,] = useRecoilState(targetTimeState);

  const timerRef = useRef<null | number>(null);

  useEffect(() => {
    if (isRunning && seconds > 0) {
      timerRef.current = window.setTimeout(() => {
        setSeconds(Math.round((targetTime - new Date().getTime()) / 1000))
      }, 1000)
    }
    return () => window.clearTimeout(timerRef.current!)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seconds, isRunning, targetTime]);


  const classes = classNames(styles.counter, {
    [styles.work]: workTheme,
    [styles.break]: breakTheme
  })

  return (
    <div className={classes}>{displayTime(seconds)}</div>
  );
}
