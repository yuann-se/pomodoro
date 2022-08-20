import styles from './timercontrols.module.scss';

interface ITimerControlsProps {
  isRunning: boolean;
  isWork: boolean;
  isStarted: boolean;
  onStartClick: () => void;
  onPauseClick: () => void;
  onStopClick: () => void;
  onSkipClick: () => void;
  onResumeClick: () => void;
  onDoneClick: () => void;
  taskName: string;
}

export function TimerControls({ isRunning, isWork, isStarted, onDoneClick, onPauseClick, onResumeClick, onSkipClick, onStartClick, onStopClick, taskName }: ITimerControlsProps) {

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
        : isStarted
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
