import styles from './header.module.scss';
import { PomodoroIcon, StatsIcon } from '../../icons';
import { Link } from 'react-router-dom';

export function Header() {
  return (
    <header>
      <div className={styles.container}>
        <Link to='/' className={styles.logo}>
          <PomodoroIcon />
          <span>pomodoro_box</span>
        </Link>

        <Link to='statistics' className={styles.statistics}>
          <StatsIcon />
          <span>Статистика</span>
        </Link>
      </div>
    </header>
  );
}
