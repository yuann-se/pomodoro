import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { useRecoilValue } from 'recoil';
import { appIntervals, IIntervals, ITask } from '../../../store';
import { TaskItem } from '../TaskItem';
import styles from './taskslist.module.scss';

interface ITasksListProps {
  list: ITask[];
  itemsType?: 'default' | 'completed';
  listType?: 'tasks' | 'completedTasks'
}

const transitionClasses = {
  enter: styles['task-enter'],
  enterActive: styles['task-enter-active'],
  exit: styles['task-exit'],
  exitActive: styles['task-exit-active']
};

export function TasksList({ list, itemsType = 'default', listType = 'tasks' }: ITasksListProps) {

  const workInterval = useRecoilValue<IIntervals>(appIntervals).work;

  const taskList = list.length ? list.map((task) => {
    return (
      <CSSTransition key={task.id} timeout={200} classNames={transitionClasses}>
        <TaskItem taskBody={task.text} poms={task.poms} taskId={task.id} itemType={itemsType} />
      </CSSTransition>
    )
  }) : null;

  const displayTime = (list: ITask[]) => {
    let sec: number = 0;
    list.forEach(task => sec += task.poms);
    sec *= workInterval;

    const hours = Math.floor(sec / 60 / 60);
    const minutes = Math.floor(sec / 60 - hours * 60);
    const seconds = Math.floor(sec - hours * 60 * 60 - minutes * 60);

    const hoursStr = hours ? `${hours} ч` : '';
    const minStr = minutes ? `${minutes} мин` : '';
    const secStr = seconds ? `${seconds} сек` : '';

    return `${hoursStr} ${minStr} ${secStr}`
  }

  return (
    <ul className={styles.tasksList}>
      <TransitionGroup component={null}>
        {taskList}
      </TransitionGroup>
      {!!list.length && (
        <li className={styles.timeCounter}>{displayTime(list)}</li>
      )}
    </ul>
  );
}
