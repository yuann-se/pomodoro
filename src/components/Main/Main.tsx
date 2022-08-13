import React from 'react';
import { CreateTaskForm } from '../CreateTaskForm';
import { Descr } from '../Descr';
import { Timer } from '../Timer';

import styles from './main.module.scss';

export function Main() {
  return (
    <main className={styles.container}>
      <div className={styles.wrapper}>
        <Descr />
        <CreateTaskForm />
        <Timer />
      </div>
    </main>
  );
}
