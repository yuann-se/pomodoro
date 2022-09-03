import { useRecoilState, useRecoilValue } from 'recoil';
import { longBreakInterval, shortBreakInterval } from '../../../settings';
import { appIntervals, currentTaskState, currentSeconds, IIntervals, isTaskDoneState, isTaskStartedState, isTimerRunningState, isTimerStartedState, isTimerStoppedState, isWorkState, stopsCountState, tasksState, currentPomodorosState, ITask, targetTimeState, workSessionsCountState, totalTimeRefPoint, pauseTimeRefPoint } from '../../../store';
import styles from './timercontrols.module.scss';

interface ITimerControlsProps {
  period: string;
}

export function TimerControls({ period }: ITimerControlsProps) {

  const storeValue = useRecoilValue(tasksState);
  const taskName = storeValue.length ? storeValue[0].text : '';
  const taskPoms = storeValue.length ? storeValue[0].poms : 0;

  const workInterval: number = useRecoilValue<IIntervals>(appIntervals).work;

  const [seconds, setSeconds] = useRecoilState(currentSeconds);
  const [, setTargetTime] = useRecoilState(targetTimeState);
  const [isRunning, setIsRunning] = useRecoilState(isTimerRunningState);
  const [isStopped, setIsStopped] = useRecoilState(isTimerStoppedState);

  const [isTaskStarted, setIsTaskStarted] = useRecoilState(isTaskStartedState);
  const [isTimerStarted, setIsTimerStarted] = useRecoilState(isTimerStartedState);
  const [isWork, setIsWork] = useRecoilState(isWorkState);
  const [isTaskDone, setIsTaskDone] = useRecoilState(isTaskDoneState);
  const [, setCurrentTask] = useRecoilState<ITask>(currentTaskState);

  const [stopsCount, setStopsCount] = useRecoilState(stopsCountState);
  const [workSessionsCount, setWorkSessionsCount] = useRecoilState(workSessionsCountState);
  const [pomodoros,] = useRecoilState(currentPomodorosState);
  const [, setTotalTimeRef] = useRecoilState(totalTimeRefPoint);
  const [, setPauseTimeRef] = useRecoilState(pauseTimeRefPoint);

  const onStartClick = () => {
    if (!isTaskStarted) setIsTaskStarted(true);
    setIsWork(prev => !prev)
    setCurrentTask(storeValue[0]);
    setIsTimerStarted(true);
    setIsRunning(true);
    setTotalTimeRef(new Date().getTime());

    if (!isTaskDone) {
      if (isWork) {
        if (workSessionsCount > 2) {
          setTargetTime(new Date().getTime() + longBreakInterval * 1000);
          setWorkSessionsCount(0);
        } else {
          setTargetTime(new Date().getTime() + shortBreakInterval * 1000);
          setWorkSessionsCount((prev) => prev + 1)
        }
      } else setTargetTime(new Date().getTime() + workInterval * 1000);
    } else {
      setTargetTime(new Date().getTime() + workInterval * 1000);
      setWorkSessionsCount(0);
    }

    if (isStopped) setIsStopped(false);
    if (isTaskDone) setIsTaskDone(false);
  }

  const onResumeClick = () => {
    setTargetTime(new Date().getTime() + seconds * 1000);
    setIsRunning(true)
  }

  const onPauseClick = () => {
    setPauseTimeRef(new Date().getTime());
    setIsRunning(false)
  }

  const onSkipClick = () => { setSeconds(0) }

  const onDoneClick = () => {
    setSeconds(0);
    setIsTaskDone(true);
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
    <div className={styles.wrapper}>
      <div>
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
              <button className={styles.btnLeft} onClick={onStartClick} disabled={!taskName || taskPoms < pomodoros}>Старт</button>
              <button className={styles.btnRight} disabled onClick={onStopClick}>Стоп</button>
            </>
        }
      </div>
      {taskPoms < pomodoros && !isWork && isTaskStarted && (
        <div className={styles.noPomodoros}>Упс! Время вышло. Добавьте еще помидорку&nbsp;&#127813; или&nbsp;завершите&nbsp;задачу</div>
      )}
    </div>
  );
}
