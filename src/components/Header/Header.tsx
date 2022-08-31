import styles from './header.module.scss';
import { PomodoroIcon, StatsIcon } from '../../icons';
import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { isMainPageState } from '../../store';

export function Header() {

  const [, setIsMainPage] = useRecoilState<boolean>(isMainPageState);

  return (
    <header>
      <div className={styles.container}>
        <Link to='/' className={styles.logo} onClick={() => setIsMainPage(true)}>
          <PomodoroIcon />
          <span>pomodoro_box</span>
        </Link>

        <Link to='statistics' className={styles.statistics} onClick={() => setIsMainPage(false)}>
          <StatsIcon />
          <span>Статистика</span>
        </Link>
      </div>
    </header>
  );
}
