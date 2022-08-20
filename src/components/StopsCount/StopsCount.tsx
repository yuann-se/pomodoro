import classNames from 'classnames';
import { useRecoilValue } from 'recoil';
import { StopsCountIcon } from '../../icons';
import { ICount, stopsCountState } from '../../store';
import styles from './stopscount.module.scss';

interface IStopsCountProps {
  period: string;
}

export function StopsCount({ period }: IStopsCountProps) {

  const stopsCount = useRecoilValue<ICount>(stopsCountState)[period] || 0;

  const classes = classNames(styles.wrapper, {
    [styles.noData]: !stopsCount
  })

  return (
    <div className={classes}>
      <div>
        <h3 className={styles.title}>Остановки</h3>
        <p className={styles.data}>{stopsCount}</p>
      </div>
      <StopsCountIcon />
    </div>
  );
}
