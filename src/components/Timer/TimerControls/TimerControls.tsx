import { useRecoilState, useRecoilValue } from 'recoil';
import { appIntervals, currentTaskState, currentSeconds, IIntervals, isTaskDoneState, isTaskStartedState, isTimerRunningState, isTimerStartedState, isTimerStoppedState, isWorkState, stopsCountState, workSessionsCountState } from '../../../store';
import styles from './timercontrols.module.scss';

interface ITimerControlsProps {
  period: string;
  taskName: string;
}

export function TimerControls({ taskName, period }: ITimerControlsProps) {

  const workInterval: number = useRecoilValue<IIntervals>(appIntervals).work;
  const [isTaskStarted, setIsTaskStarted] = useRecoilState(isTaskStartedState);
  const [isWork, setIsWork] = useRecoilState(isWorkState);
  const [, setCurrentTask] = useRecoilState<string>(currentTaskState);
  const [isTimerStarted, setIsTimerStarted] = useRecoilState(isTimerStartedState);
  const [isRunning, setIsRunning] = useRecoilState(isTimerRunningState);
  const [isStopped, setIsStopped] = useRecoilState(isTimerStoppedState);
  const [isTaskDone, setIsTaskDone] = useRecoilState(isTaskDoneState);
  const [, setSeconds] = useRecoilState(currentSeconds);
  const [, setWorkSessionsCount] = useRecoilState(workSessionsCountState);
  const [stopsCount, setStopsCount] = useRecoilState(stopsCountState);

  const onStartClick = () => {
    if (!isTaskStarted) setIsTaskStarted(true);
    setIsWork(prev => !prev)
    setCurrentTask(taskName);
    setIsTimerStarted(true);
    setIsRunning(true);
    if (isStopped) setIsStopped(false);
    if (isTaskDone) setIsTaskDone(false);
  }

  const onResumeClick = () => { setIsRunning(true) }

  const onPauseClick = () => { setIsRunning(false) }

  const onSkipClick = () => { setSeconds(0) }

  const onDoneClick = () => {
    setSeconds(0);
    setIsTaskDone(true);
    setIsTaskStarted(false);
    setWorkSessionsCount(0);
  }

  const onStopClick = () => {
    setIsRunning(false);
    setIsTimerStarted(false);
    setIsWork(false);
    setSeconds(workInterval);

    Object.keys(stopsCount).includes(period)
      ? setStopsCount({ ...stopsCount, [period]: stopsCount[period] + 1 })
      : setStopsCount({ ...stopsCount, [period]: 1 })
    setIsStopped(true);
  }

  return (
    <>
      {isRunning
        ? isWork
          ? <>
            <button className={styles.btnLeft} onClick={onPauseClick}>Пауза</button>
            <button className={styles.btnRight} onClick={onStopClick}>Стоп</button>
          </>
          : <>
            <button className={styles.btnLeft} onClick={onPauseClick}>Пауза</button>
            <button className={styles.btnRight} onClick={onSkipClick}>Пропустить</button>
          </>
        : isTimerStarted
          ? isWork
            ? <>
              <button className={styles.btnLeft} onClick={onResumeClick}>Продолжить</button>
              <button className={styles.btnRight} onClick={onDoneClick}>Сделано</button>
            </>
            : <>
              <button className={styles.btnLeft} onClick={onResumeClick}>Продолжить</button>
              <button className={styles.btnRight} onClick={onSkipClick}>Пропустить</button>
            </>
          : <>
            <button className={styles.btnLeft} onClick={onStartClick} disabled={!taskName}>Старт</button>
            <button className={styles.btnRight} disabled onClick={onStopClick}>Стоп</button>
          </>
      }
    </>
  );
}
