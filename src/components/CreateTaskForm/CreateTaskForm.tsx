import React from 'react';
import styles from './createtaskform.module.scss';

export function CreateTaskForm() {

  const handleClick = (e: React.SyntheticEvent) => {
    e.preventDefault()
  }
  return (
    <form className={styles.form}>
      <input type="text" placeholder='Название задачи' />
      <button onClick={handleClick}>Добавить</button>
    </form>
  );
}
