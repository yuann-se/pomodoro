import { useEffect, useRef } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import classnames from 'classnames';
import styles from './timer.module.scss';
import { TimerControls } from './TimerControls';
import sound from '../../sounds/sound1.mp3'
import { TimeoutMsg } from './TimeoutMsg';
import { currentPomodorosState, currentTaskState, currentTimerState, isModalOpenState, isTaskDoneState, isTaskStartedState, isTimerRunningState, isTimerStartedState, isTimerStoppedState, isWorkState, stopsCountState, tasksState, timeOnPauseState, totalPomodorosState, totalTimeState, workSessionsCountState } from '../../store';

const audio = new Audio(sound);
audio.volume = .1;

export const getToday = () => {
  const date = new Date();
  const month = date.getMonth();
  const day = date.getDate();
  const period = `${month}&${day}`;
  return period
}

const workInterval: number = 10;
const shortBreakInterval: number = 5;
const longBreakInterval: number = 7;

export function Timer() {

  const timerRef = useRef<null | number>(null);
  const clearTimer = () => {
    window.clearTimeout(timerRef.current!)
  }

  const storeValue = useRecoilValue(tasksState);
  const taskName = storeValue.length ? storeValue[0].text : '';
  const [, setCurrentTask] = useRecoilState(currentTaskState);

  const [pomodoros, setPomodoros] = useRecoilState(currentPomodorosState);
  const [totalPomodoros, setTotalPomodoros] = useRecoilState(totalPomodorosState);
  const [seconds, setSeconds] = useRecoilState(currentTimerState);
  const [isTimerStarted, setIsTimerStarted] = useRecoilState(isTimerStartedState);
  const [isRunning, setIsRunning] = useRecoilState(isTimerRunningState);

  const [totalTime, setTotalTime] = useRecoilState(totalTimeState);
  const [timeOnPause, setTimeOnPause] = useRecoilState(timeOnPauseState);
  const [isTaskStarted, setIsTaskStarted] = useRecoilState(isTaskStartedState);
  const [isTaskDone, setIsTaskDone] = useRecoilState(isTaskDoneState);
  const [isStopped, setIsStopped] = useRecoilState(isTimerStoppedState);
  const [stopsCount, setStopsCount] = useRecoilState(stopsCountState);

  const [isWork, setIsWork] = useRecoilState(isWorkState);
  const [workSessionsCount, setWorkSessionsCount] = useRecoilState(workSessionsCountState);
  const [isModalOpen, setIsModalOpen] = useRecoilState(isModalOpenState);

  const displayTime = () => {
    const min = Math.floor(seconds / 60);
    const sec = seconds - (60 * min);
    const minStr = min < 10 ? `0${min}` : `${min}`;
    const secStr = sec < 10 ? `0${sec}` : `${sec}`;
    return `${minStr}:${secStr}`
  }

  useEffect(() => {
    if (isRunning && seconds > 0) {
      timerRef.current = window.setTimeout(() => {
        setSeconds((prev) => prev - 1)
      }, 1000)
    }
    if (seconds === 0) {
      setIsRunning(false);
      setIsTimerStarted(false);
      setIsModalOpen(true);
      if (!isTaskDone) {
        audio.play();
        if (isWork) {
          if (workSessionsCount > 2) {
            setSeconds(longBreakInterval);
            setWorkSessionsCount(0);
          } else {
            setSeconds(shortBreakInterval);
            setWorkSessionsCount((prev) => prev + 1)
          }
          setPomodoros((prev) => prev + 1);

          const period = getToday();
          Object.keys(totalPomodoros).includes(period)
            ? setTotalPomodoros({ ...totalPomodoros, [period]: totalPomodoros[period] + 1 })
            : setTotalPomodoros({ ...totalPomodoros, [period]: 1 })
        } else {
          setSeconds(workInterval);
        }
      } else {
        setSeconds(workInterval);
        setPomodoros(1);
        setIsWork(false);
      }
    }
    return () => clearTimer();
  }, [isRunning, seconds, isWork, pomodoros, isTaskDone, workSessionsCount, totalPomodoros, setPomodoros, setSeconds, setIsRunning, setIsTimerStarted, setIsModalOpen, setIsWork, setWorkSessionsCount, setTotalPomodoros])

  // Считаем общее время
  useEffect(() => {
    if (isTaskStarted && !isTaskDone && !isStopped && isTimerStarted) {
      const period = getToday();
      setTimeout(() => {
        Object.keys(totalTime).includes(period)
          ? setTotalTime({ ...totalTime, [period]: totalTime[period] + 1 })
          : setTotalTime({ ...totalTime, [period]: 0 });
      }, 1000);
    }
  }, [isTaskStarted, isTaskDone, isStopped, setTotalTime, totalTime, isTimerStarted]);

  // Считаем время на паузе
  useEffect(() => {
    if (!isRunning && !isStopped && isTaskStarted && isTimerStarted) {
      const period = getToday();
      setTimeout(() => {
        Object.keys(timeOnPause).includes(period)
          ? setTimeOnPause({ ...timeOnPause, [period]: timeOnPause[period] + 1 })
          : setTimeOnPause({ ...timeOnPause, [period]: 0 })
      }, 1000);
    }
  }, [setTimeOnPause, timeOnPause, isRunning, isStopped, isTaskStarted, isTimerStarted])

  const onStartClick = () => {
    if (!isTaskStarted) setIsTaskStarted(true);
    setCurrentTask(taskName);
    setIsWork(!isWork)
    setIsTimerStarted(true);
    setIsRunning(true);
    if (isStopped) setIsStopped(false);
    if (isTaskDone) setIsTaskDone(false);
  }

  const onResumeClick = () => {
    setIsRunning(true);
  }

  const onPauseClick = () => {
    setIsRunning(false);
  }

  const onSkipClick = () => {
    setSeconds(0);
  }

  const onDoneClick = () => {
    setSeconds(0);
    setIsTaskDone(true);
    setIsTaskStarted(false);
  }

  const onStopClick = () => {
    setIsRunning(false);
    setIsTimerStarted(false);
    setIsWork(false);
    setSeconds(workInterval);

    const period = getToday();
    Object.keys(stopsCount).includes(period)
      ? setStopsCount({ ...stopsCount, [period]: stopsCount[period] + 1 })
      : setStopsCount({ ...stopsCount, [period]: 1 })
    setIsStopped(true);
  }

  const classes = classnames(styles.wrapper, {
    [styles.workTheme]: isWork && isTimerStarted,
    [styles.breakTheme]: !isWork && isTimerStarted,
  });

  return (
    <div className={classes}>
      <div className={styles.header}>
        <span>{taskName}</span>
        <span>Помидор {pomodoros}</span>
      </div>

      <div className={styles.timerBody}>
        <div className={styles.counter}>{displayTime()}</div>
        {taskName && (
          <div className={styles.taskName}>
            <span>Задача - </span>
            <span>{taskName}</span>
          </div>
        )}
        <div>
          <TimerControls isRunning={isRunning} isStarted={isTimerStarted} isWork={isWork} onDoneClick={onDoneClick} onPauseClick={onPauseClick} onResumeClick={onResumeClick} onSkipClick={onSkipClick} onStartClick={onStartClick} onStopClick={onStopClick} />
        </div>
        <div>Total time: {JSON.stringify(totalTime)}</div>
        <div>Time on pause: {JSON.stringify(timeOnPause)}</div>
        <div>Total pomodoros: {JSON.stringify(totalPomodoros)}</div>
        <div>Stops Count: {JSON.stringify(stopsCount)}</div>
      </div>
      <TimeoutMsg
        message={isTaskDone ? <>Вы справились! &#127775;</> : isWork ? <>Пора отдохнуть! &#128077;</> : <>Пора за работу! &#128170;</>}
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
