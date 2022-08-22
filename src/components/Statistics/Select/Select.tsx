import classNames from 'classnames';
import { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { useRecoilState } from 'recoil';
import { SelectArrow } from '../../../icons';
import { selectedDayState, selectedPeriod } from '../../../store';
import styles from './select.module.scss';

const transitionClasses = {
  enter: styles['options-enter'],
  enterActive: styles['options-enter-active'],
  exit: styles['options-exit'],
  exitActive: styles['options-exit-active']
};

interface ISelectProps {
  weekDay: number;
}

export function Select({ weekDay }: ISelectProps) {

  const options = ['Эта неделя', 'Прошедшая неделя', '2 недели назад'];

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useRecoilState(selectedPeriod);
  const [selectedDay, setSelectedDay] = useRecoilState<number>(selectedDayState);

  const handleClick = (opt: string) => {
    setSelectedOption(opt);
    setIsOpen(false);
    if (opt === 'Эта неделя' && selectedDay > weekDay) setSelectedDay(weekDay);
  }

  const buttons = options.map((option) => {
    return <button key={option}
      className={styles.option}
      style={selectedOption === option ? { display: 'none' } : {}}
      onClick={() => { handleClick(option) }}
    >
      <span>{option}</span>
    </button>
  });

  const mainOptionClasses = classNames(styles.mainOption, {
    [styles.isOpen]: isOpen
  })

  return (
    <div className={styles.wrapper}>
      <button className={mainOptionClasses} onClick={() => setIsOpen(prev => !prev)}>
        <span>{selectedOption}</span>
        <SelectArrow />
      </button>
      <CSSTransition
        in={isOpen}
        timeout={200}
        classNames={transitionClasses}
        mountOnEnter
        unmountOnExit
      >
        <div className={styles.optionsWrapper}>
          {buttons}
        </div>
      </CSSTransition>
    </div>
  );
}
