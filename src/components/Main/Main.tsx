import { CreateTaskForm } from '../CreateTaskForm';
import { AppDescr } from '../AppDescr';
import { Timer } from '../Timer';

import styles from './main.module.scss';

export function Main() {
  return (
    <main className={styles.wrapper}>
      <div className={styles.container}>
        <AppDescr />
        <CreateTaskForm />
        <Timer />
      </div>
    </main>
  );
}
