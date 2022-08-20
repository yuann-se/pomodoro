import { SyntheticEvent, useEffect, useRef } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styles from './createtaskform.module.scss';
import { TaskItem } from './TaskItem';
import { useRecoilState, useRecoilValue } from 'recoil';
import { currentTaskState, isTaskDoneState, ITask, tasksState } from '../../store';

const transitionClasses = {
  enter: styles['task-enter'],
  enterActive: styles['task-enter-active'],
  exit: styles['task-exit'],
  exitActive: styles['task-exit-active']
};

const generateRandomString = () => Math.random().toString(36).substring(2, 15);

export function CreateTaskForm() {

  const inputRef = useRef<HTMLInputElement>(null);

  const [tasks, setTasks] = useRecoilState<ITask[]>(tasksState);
  const isTaskDone = useRecoilValue<boolean>(isTaskDoneState);
  const currentTask = useRecoilValue<string>(currentTaskState);

  useEffect(() => {
    if (isTaskDone) {
      setTasks((prev) => prev.filter((item) => item.text !== currentTask));
    }
  }, [isTaskDone, setTasks, currentTask]);

  const handleClick = (e: SyntheticEvent) => {
    e.preventDefault();
    if (inputRef.current?.value.trim()) {
      setTasks([...tasks, { poms: 1, text: inputRef.current.value.trim(), id: generateRandomString() }]);
      inputRef.current.value = '';
    }
  };

  const taskList = tasks.map((task) => {
    return (
      <CSSTransition key={task.id} timeout={200} classNames={transitionClasses}>
        <TaskItem taskBody={task.text} poms={task.poms} taskId={task.id} />
      </CSSTransition>
    )
  });

  const getTime = () => {
    let poms: number = 0;
    tasks.forEach(task => poms += task.poms);
    poms *= 25;
    if (poms < 60) return `${poms} минут`;
    const hours = Math.floor(poms / 60);
    return `${hours} ч ${poms - hours * 60} мин`;
  }

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
        {!!tasks.length && (
          <li className={styles.timeCounter}>{getTime()}</li>
        )}
      </ul>
    </>
  );
}
