import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { DecreaseIcon, DeleteIcon, EditIcon, IncreaseIcon } from '../../../../icons';
import { ITask, tasksState } from '../../../../store';
import { ConfirmDeleteModal } from './ConfirmDeleteModal';
import styles from './dropdownmenu.module.scss';

interface IDropdownMenuProps {
  poms: number;
  taskId: string;
  onEditClick: () => void;
}

export function DropdownMenu({ poms, taskId, onEditClick }: IDropdownMenuProps) {

  const [tasks, setTasks] = useRecoilState<ITask[]>(tasksState);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

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

  return (
    <ul className={styles.itemsList}>
      <li>
        <button className={styles.btn} onClick={onIncreaseClick}>
          <IncreaseIcon />
          <span>Увеличить</span>
        </button>
      </li>
      <li>
        <button className={styles.btn} disabled={poms === 1} onClick={onDecreaseClick}>
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
      <ConfirmDeleteModal open={isModalOpen} onClose={() => setIsModalOpen(false)} onDelete={() => setTasks(tasks.filter(task => task.id !== taskId))} />
    </ul>
  );
}
