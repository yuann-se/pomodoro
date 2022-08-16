import { FormEventHandler, useEffect, useRef, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { useRecoilState } from 'recoil';
import { MenuIcon } from '../../../icons';
import { ITask, tasksState } from '../../../store';
import { DropdownMenu } from './DropdownMenu';
import styles from './taskitem.module.scss';

interface ITaskItemProps {
  taskBody: string;
  poms: number;
  taskId: string;
}

const transitionClasses = {
  enter: styles['menu-enter'],
  enterActive: styles['menu-enter-active'],
  exit: styles['menu-exit'],
  exitActive: styles['menu-exit-active']
};

export function TaskItem({ taskBody, poms, taskId }: ITaskItemProps) {

  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [tasks, setTasks] = useRecoilState<ITask[]>(tasksState);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleOverlayClick = (e: MouseEvent) => {
      if (e.target instanceof Node && !dropdownRef.current?.contains(e.target) && !btnRef.current?.contains(e.target)) {
        if (isDropdownOpen) setIsDropdownOpen(false);
      }
    };
    document.addEventListener('click', handleOverlayClick);
    return () => document.removeEventListener('click', handleOverlayClick);
  });

  useEffect(() => {
    if (isEdit) inputRef.current?.select();
  }, [isEdit]);

  const onAccept: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const updatedData = tasks.map((task) => {
      if (task.id === taskId && inputRef.current?.value.trim()) {
        return { ...task, text: inputRef.current?.value.trim() }
      }
      return task;
    })
    setTasks(updatedData);
    setIsEdit(false);
  }

  return (
    <li className={styles.wrapper}>
      <span className={styles.pomodoroCount}>{poms}</span>
      {!isEdit && (
        <span className={styles.taskBody}>{taskBody}</span>
      )}
      {isEdit && (
        <form className={styles.editForm} onSubmit={onAccept}>
          <input defaultValue={taskBody} ref={inputRef}></input>
          <button></button>
        </form>
      )}
      <button className={styles.menuBtn} aria-label='Открыть меню' onClick={() => setIsDropdownOpen(!isDropdownOpen)} ref={btnRef}>
        <MenuIcon />
      </button>
      <CSSTransition in={isDropdownOpen} timeout={200} mountOnEnter unmountOnExit classNames={transitionClasses} >
        <div className={styles.dropdownWrapper} ref={dropdownRef}>
          <DropdownMenu poms={poms} taskId={taskId} onEditClick={() => { setIsEdit(true); setIsDropdownOpen(false) }} />
        </div>
      </CSSTransition>
    </li>
  );
}
