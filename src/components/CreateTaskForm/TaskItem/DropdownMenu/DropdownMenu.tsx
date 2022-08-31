import { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { DecreaseIcon, DeleteIcon, EditIcon, IncreaseIcon, MarkDoneIcon } from '../../../../icons';
import { appIntervals, completedTasksState, currentPomodorosState, currentSeconds, IIntervals, isTaskDoneState, isTaskStartedState, isTimerRunningState, isTimerStartedState, isWorkState, ITask, tasksState, workSessionsCountState } from '../../../../store';
import { ConfirmDeleteModal } from './ConfirmDeleteModal';
import styles from './dropdownmenu.module.scss';

interface IDropdownMenuProps {
  poms: number;
  taskId: string;
  onEditClick: () => void;
}

export function DropdownMenu({ poms, taskId, onEditClick }: IDropdownMenuProps) {

  const workInterval: number = useRecoilValue<IIntervals>(appIntervals).work;
  const [tasks, setTasks] = useRecoilState<ITask[]>(tasksState);
  const [completedTasks, setCompletedTasks] = useRecoilState<ITask[]>(completedTasksState);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [, setSeconds] = useRecoilState(currentSeconds);
  const [, setWorkSessionsCount] = useRecoilState(workSessionsCountState);
  const [isTaskStarted, setIsTaskStarted] = useRecoilState(isTaskStartedState);
  const [, setIsWork] = useRecoilState(isWorkState);
  const [pomodoros, setPomodoros] = useRecoilState(currentPomodorosState);
  const [, setIsTimerStarted] = useRecoilState(isTimerStartedState);
  const [, setIsRunning] = useRecoilState(isTimerRunningState);
  const [, setIsTaskDone] = useRecoilState(isTaskDoneState);

  const onIncreaseClick = () => {
    const updatedData = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, poms: task.poms! + 1 }
      }
      return task;
    })
    setTasks(updatedData);
  };

  const onDecreaseClick = () => {
    const updatedData = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, poms: task.poms! - 1 }
      }
      return task;
    })
    setTasks(updatedData);
  };

  const onMarkDoneClick = () => {
    if (tasks.length && taskId === tasks[0].id && isTaskStarted) {
      setSeconds(0);
      setIsTaskDone(true);
    } else {
      const doneTask = tasks.filter(task => task.id === taskId)[0];
      setCompletedTasks([...completedTasks, doneTask]);
      setTasks(prev => prev.filter(task => task.id !== taskId));
    }
  }

  const onConfirmClick = () => {
    if (tasks.length && taskId === tasks[0].id && isTaskStarted) {
      setIsTaskStarted(false);
      setWorkSessionsCount(0);
      setIsWork(false);
      setSeconds(workInterval);
      setPomodoros(1);
      setIsRunning(false);
      setIsTimerStarted(false);
    }
    setTasks(tasks.filter(task => task.id !== taskId));
  }

  return (
    <ul className={styles.itemsList}>
      <li>
        <button className={styles.btn} onClick={onIncreaseClick}>
          <IncreaseIcon />
          <span>Увеличить</span>
        </button>
      </li>
      <li>
        <button className={styles.btn} disabled={poms === 1 || poms <= pomodoros} onClick={onDecreaseClick}>
          <DecreaseIcon />
          <span>Уменьшить</span>
        </button>
      </li>
      <li>
        <button className={styles.btn} onClick={onEditClick}>
          <EditIcon />
          <span>Редактировать</span>
        </button>
      </li>
      <li>
        <button className={styles.btn} onClick={onMarkDoneClick} >
          <MarkDoneIcon />
          <span>Сделано!</span>
        </button>
      </li>
      <li>
        <button className={styles.btn} onClick={() => setIsModalOpen(true)}>
          <DeleteIcon />
          <span>Удалить</span>
        </button>
      </li>
      <ConfirmDeleteModal open={isModalOpen} onClose={() => setIsModalOpen(false)} onDelete={onConfirmClick} />
    </ul>
  );
}
