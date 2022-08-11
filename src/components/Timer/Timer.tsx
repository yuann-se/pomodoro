import React from 'react';
import styles from './timer.module.scss';

export function Timer() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <span>Сверстать сайт </span>
        <span>Помидор 1</span>
      </div>
    </div>
  );
}
