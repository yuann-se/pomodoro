import { useEffect, useRef } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import classnames from 'classnames';
import styles from './timer.module.scss';
import { TimerControls } from './TimerControls';
import workTimeSound from '../../sounds/workTime.mp3';
import breakTimeSound from '../../sounds/breakTime.mp3';
import successSound from '../../sounds/success.mp3'
import { TimeoutMsg } from './TimeoutMsg';
import { appIntervals, currentPomodorosState, currentTimerState, IIntervals, isModalOpenState, isTaskDoneState, isTaskStartedState, isTimerRunningState, isTimerStartedState, isTimerStoppedState, isWorkState, stopsCountState, tasksState, timeOnPauseState, totalPomodorosState, totalTimeState, workSessionsCountState } from '../../store';
import { ClockFace } from './ClockFace';

const workTimeAudio = new Audio(workTimeSound); workTimeAudio.volume = .1;
const breakTimeAudio = new Audio(breakTimeSound); breakTimeAudio.volume = .1;
const successAudio = new Audio(successSound); successAudio.volume = .1;

export const getToday = () => {
  const date = new Date();
  const month = date.getMonth();
  const day = date.getDate();
  const period = `${month}&${day}`;
  return period
}
const period = getToday();

export function Timer() {

  const workInterval: number = useRecoilValue<IIntervals>(appIntervals).work;
  const shortBreakInterval: number = useRecoilValue<IIntervals>(appIntervals).shortBreak;
  const longBreakInterval: number = useRecoilValue<IIntervals>(appIntervals).longBreak;

  const storeValue = useRecoilValue(tasksState);
  const taskName = storeValue.length ? storeValue[0].text : '';

  const [pomodoros, setPomodoros] = useRecoilState(currentPomodorosState);
  const [totalPomodoros, setTotalPomodoros] = useRecoilState(totalPomodorosState);
  const [seconds, setSeconds] = useRecoilState(currentTimerState);
  const [isTimerStarted, setIsTimerStarted] = useRecoilState(isTimerStartedState);
  const [isRunning, setIsRunning] = useRecoilState(isTimerRunningState);

  const [totalTime, setTotalTime] = useRecoilState(totalTimeState);
  const [timeOnPause, setTimeOnPause] = useRecoilState(timeOnPauseState);
  const [isTaskStarted,] = useRecoilState(isTaskStartedState);
  const [isTaskDone,] = useRecoilState(isTaskDoneState);
  const [isStopped,] = useRecoilState(isTimerStoppedState);
  const [stopsCount,] = useRecoilState(stopsCountState);

  const [isWork, setIsWork] = useRecoilState(isWorkState);
  const [workSessionsCount, setWorkSessionsCount] = useRecoilState(workSessionsCountState);
  const [isModalOpen, setIsModalOpen] = useRecoilState(isModalOpenState);

  const timerRef = useRef<null | number>(null);
  useEffect(() => {
    if (isRunning && seconds > 0) {
      timerRef.current = window.setTimeout(() => {
        setSeconds((prev) => prev - 1)
      }, 1000)
    }
    return () => window.clearTimeout(timerRef.current!)
  }, [isRunning, seconds, setSeconds]);

  useEffect(() => {
    if (seconds === 0) {
      isTaskDone ? successAudio.play() : isWork ? breakTimeAudio.play() : workTimeAudio.play();
      setIsRunning(false);
      setIsTimerStarted(false);
      setIsModalOpen(true);
      if (!isTaskDone) {
        if (isWork) {
          if (workSessionsCount > 2) {
            setSeconds(longBreakInterval);
            setWorkSessionsCount(0);
          } else {
            setSeconds(shortBreakInterval);
            setWorkSessionsCount((prev) => prev + 1)
          }
          setPomodoros((prev) => prev + 1);

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
        Object.keys(totalPomodoros).includes(period)
          ? setTotalPomodoros({ ...totalPomodoros, [period]: totalPomodoros[period] + 1 })
          : setTotalPomodoros({ ...totalPomodoros, [period]: 1 })
      }
    }
  }, [seconds, isWork, isTaskDone, workSessionsCount, totalPomodoros, setPomodoros, setSeconds, setIsRunning, setIsTimerStarted, setIsModalOpen, setIsWork, setWorkSessionsCount, setTotalPomodoros, workInterval, shortBreakInterval, longBreakInterval])

  // Считаем общее время
  useEffect(() => {
    if (isTaskStarted && !isTaskDone && !isStopped && isTimerStarted) {
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
      setTimeout(() => {
        Object.keys(timeOnPause).includes(period)
          ? setTimeOnPause({ ...timeOnPause, [period]: timeOnPause[period] + 1 })
          : setTimeOnPause({ ...timeOnPause, [period]: 0 })
      }, 1000);
    }
  }, [setTimeOnPause, timeOnPause, isRunning, isStopped, isTaskStarted, isTimerStarted])

  const classes = classnames(styles.wrapper, {
    [styles.workTheme]: isWork && isTimerStarted,
    [styles.breakTheme]: !isWork && isTimerStarted,
  });

  return (
    <div className={classes}>
      <div className={styles.header}>
        <span>{taskName}</span>
        {taskName && (
          <span>Помидор {pomodoros}</span>
        )}
      </div>

      <div className={styles.timerBody}>
        <ClockFace seconds={seconds} workTheme={isWork && isTimerStarted} breakTheme={!isWork && isTimerStarted} />
        {taskName && (
          <div className={styles.taskName}>
            <span>Задача - </span>
            <span>{taskName}</span>
          </div>
        )}
        <div>
          <TimerControls taskName={taskName} period={period} />
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
