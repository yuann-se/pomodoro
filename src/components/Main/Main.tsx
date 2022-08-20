import { CreateTaskForm } from '../CreateTaskForm';
import { Descr } from '../Descr';
import { Timer } from '../Timer';

import styles from './main.module.scss';

export function Main() {
  return (
    <main className={styles.wrapper}>
      <div className={styles.container}>
        <Descr />
        <CreateTaskForm />
        <Timer />
      </div>
    </main>
  );
}
