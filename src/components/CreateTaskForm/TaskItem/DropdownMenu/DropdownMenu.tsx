import { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { DecreaseIcon, DeleteIcon, EditIcon, IncreaseIcon } from '../../../../icons';
import { appIntervals, currentPomodorosState, currentSeconds, IIntervals, isTaskStartedState, isTimerRunningState, isTimerStartedState, isWorkState, ITask, tasksState, workSessionsCountState } from '../../../../store';
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
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [, setSeconds] = useRecoilState(currentSeconds);
  const [, setWorkSessionsCount] = useRecoilState(workSessionsCountState);
  const [, setIsTaskStarted] = useRecoilState(isTaskStartedState);
  const [, setIsWork] = useRecoilState(isWorkState);
  const [pomodoros, setPomodoros] = useRecoilState(currentPomodorosState);
  const [, setIsTimerStarted] = useRecoilState(isTimerStartedState);
  const [, setIsRunning] = useRecoilState(isTimerRunningState);

  const onIncreaseClick = () => {
    const updatedData = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, poms: task.poms + 1 }
      }
      return task;
    })
    setTasks(updatedData);
  };

  const onDecreaseClick = () => {
    const updatedData = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, poms: task.poms - 1 }
      }
      return task;
    })
    setTasks(updatedData);
  };

  const onConfirmClick = () => {
    setTasks(tasks.filter(task => task.id !== taskId));
    setIsTaskStarted(false);
    setWorkSessionsCount(0);
    setIsWork(false);
    setSeconds(workInterval);
    setPomodoros(1);
    setIsRunning(false);
    setIsTimerStarted(false);
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
        <button className={styles.btn} onClick={() => setIsModalOpen(true)}>
          <DeleteIcon />
          <span>Удалить</span>
        </button>
      </li>
      <ConfirmDeleteModal open={isModalOpen} onClose={() => setIsModalOpen(false)} onDelete={onConfirmClick} />
    </ul>
  );
}
