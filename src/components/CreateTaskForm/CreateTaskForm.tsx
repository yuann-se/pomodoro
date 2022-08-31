import { SyntheticEvent, useRef } from 'react';
import styles from './createtaskform.module.scss';
import { useRecoilState } from 'recoil';
import { completedTasksState, ITask, tasksState } from '../../store';
import { TasksList } from './TasksList';
import { generateRandomString } from '../../utils';

export function CreateTaskForm() {

  const inputRef = useRef<HTMLInputElement>(null);

  const [tasks, setTasks] = useRecoilState<ITask[]>(tasksState);
  const [completedTasks,] = useRecoilState<ITask[]>(completedTasksState);

  const handleClick = (e: SyntheticEvent) => {
    e.preventDefault();
    if (inputRef.current?.value.trim()) {
      setTasks([...tasks, { poms: 1, text: inputRef.current.value.trim(), id: generateRandomString() }]);
      inputRef.current.value = '';
    }
  };

  return (
    <>
      <form className={styles.form}>
        <input type="text" placeholder='Название задачи' ref={inputRef} />
        <button className={styles.addBtn} onClick={handleClick}>Добавить</button>
      </form>

      <TasksList list={tasks} />
      <TasksList list={completedTasks} itemsType='completed' listType='completedTasks' />

    </>
  );
}
