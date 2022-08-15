import { SyntheticEvent, useEffect, useRef } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styles from './createtaskform.module.scss';
import { TaskItem } from './TaskItem';
import { useRecoilState, useRecoilValue } from 'recoil';
import { isTaskDoneState, tasksState } from '../../store';

const transitionClasses = {
  enter: styles['task-enter'],
  enterActive: styles['task-enter-active'],
  exit: styles['task-exit'],
  exitActive: styles['task-exit-active']
};

export function CreateTaskForm() {

  const isTaskDone = useRecoilValue(isTaskDoneState);

  const inputRef = useRef<HTMLInputElement>(null);

  const [tasks, setTasks] = useRecoilState<string[]>(tasksState);

  useEffect(() => {
    if (isTaskDone) {
      setTasks((prev) => prev.filter((_, i) => i !== 0))
    }
  }, [isTaskDone, setTasks])

  const handleClick = (e: SyntheticEvent) => {
    e.preventDefault();
    if (inputRef.current?.value.trim()) {
      setTasks([...tasks, inputRef.current.value.trim()]);
      inputRef.current.value = '';
    }
  }

  const taskList = tasks.map((task) => {
    return (
      <CSSTransition key={task} timeout={200} classNames={transitionClasses}>
        <TaskItem taskBody={task} />
      </CSSTransition>
    )
  })

  return (
    <>
      <form className={styles.form}>
        <input type="text" placeholder='Название задачи' ref={inputRef} />
        <button className={styles.addBtn} onClick={handleClick}>Добавить</button>
      </form>
      <ul className={styles.tasksList}>
        <TransitionGroup component={null}>
          {taskList}
        </TransitionGroup>
      </ul>

      {!!tasks.length && (
        <div className={styles.totalTime}>{tasks.length * 25} минут</div>
      )}
    </>
  );
}
