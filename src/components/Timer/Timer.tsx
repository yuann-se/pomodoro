import { useEffect, useState } from 'react';
import styles from './timer.module.scss';
import classnames from 'classnames';
import { TimeoutMsg } from './TimeoutMsg';
import sound from '../../sounds/sound1.mp3'

const audio = new Audio(sound);
audio.volume = .1;

export function Timer() {

  const [seconds, setSeconds] = useState<number>(10);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isWork, setIsWork] = useState<boolean | undefined>();
  const [isStarted, setIsStarted] = useState<boolean>(false);
  const [pomodoros, setPomodoros] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const displayTime = () => {
    const min = Math.floor(seconds / 60);
    const sec = seconds - (60 * min);
    const minStr = min < 10 ? `0${min}` : `${min}`;
    const secStr = sec < 10 ? `0${sec}` : `${sec}`;
    return `${minStr}:${secStr}`
  }

  function setTimer() {
    const timer = setTimeout(() => {
      setSeconds(seconds - 1);
    }, 1000);
    return timer;
  }

  useEffect(() => {
    if (isRunning && seconds > 0) {
      setTimer()
    }
    return () => clearTimeout(setTimer());
  });

  useEffect(() => {
    if (seconds === 0) {
      audio.play();
      setIsRunning(false);
      setIsStarted(false);
      setIsModalOpen(true);
      if (isWork) {
        setSeconds(5);
        setPomodoros(pomodoros + 1);
      } else {
        setSeconds(10);
      }
    }
  }, [isRunning, seconds, isWork, pomodoros])

  const onStartClick = () => {
    typeof isWork === 'undefined' ? setIsWork(true) : setIsWork(!isWork)
    setIsStarted(true);
    setIsRunning(true);
  }

  const onResumeClick = () => {
    setIsRunning(true);
  }

  const onPauseClick = () => {
    setIsRunning(false);
    clearTimeout(setTimer());
  }

  const classes = classnames(styles.wrapper, {
    [styles.workTheme]: isWork && isStarted,
    [styles.breakTheme]: !isWork && isStarted,
  });

  return (
    <div className={classes}>
      <div className={styles.header}>
        <span>Сверстать сайт </span>
        <span>Помидор {pomodoros}</span>
      </div>

      <div className={styles.timerBody}>
        <div className={styles.counter}>{displayTime()}</div>
        <div className={styles.taskName}>
          <span>Задача 1 - </span>
          <span>Сверстать сайт</span>
        </div>
        <div>

          {isRunning
            ? isWork
              ? <>
                <button className={styles.btnLeft} onClick={onPauseClick}>Пауза</button>
                <button className={styles.btnRight} onClick={() => { }}>Стоп</button>
              </>
              : <>
                <button className={styles.btnLeft} onClick={onPauseClick}>Пауза</button>
                <button className={styles.btnRight} onClick={() => { }}>Пропустить</button>
              </>
            : isStarted
              ? isWork
                ? <>
                  <button className={styles.btnLeft} onClick={onResumeClick}>Продолжить</button>
                  <button className={styles.btnRight} onClick={() => { }}>Сделано</button>
                </>
                : <>
                  <button className={styles.btnLeft} onClick={onResumeClick}>Продолжить</button>
                  <button className={styles.btnRight} onClick={() => { }}>Пропустить</button>
                </>
              : <>
                <button className={styles.btnLeft} onClick={onStartClick}>Старт</button>
                <button className={styles.btnRight} disabled onClick={() => { }}>Стоп</button>
              </>
          }

        </div>
      </div>
      <TimeoutMsg
        message={isWork ? <div>Пора отдохнуть! &#128077;</div> : <div>Пора за работу! &#128170;</div>}
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
