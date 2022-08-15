import React from 'react';
import styles from './taskitem.module.scss';

interface ITaskItemProps {
  taskBody: string;
}

export function TaskItem({ taskBody }: ITaskItemProps) {
  return (
    <li className={styles.wrapper}>
      <span className={styles.pomodoroCount}>1</span>
      <span className={styles.taskBody}>{taskBody}</span>
      <button className={styles.menuBtn}>
        <svg width="26" height="6" viewBox="0 0 26 6" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="3" cy="3" r="3" fill="#C4C4C4" />
          <circle cx="13" cy="3" r="3" fill="#C4C4C4" />
          <circle cx="23" cy="3" r="3" fill="#C4C4C4" />
        </svg>
      </button>
    </li>
  );
}
