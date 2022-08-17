import React from 'react';
import styles from './confirmdeletemodal.module.scss';
import { CloseIcon } from '../../../../../icons';
import { Modal } from '../../../../Modal';

interface IConfirmDeleteModalProps {
  open: boolean;
  onClose: () => void;
  onDelete: () => void;
}

export function ConfirmDeleteModal({ open, onClose, onDelete }: IConfirmDeleteModalProps) {

  const handleClick = (e: React.SyntheticEvent) => {
    e.stopPropagation();
    onClose();
  };

  const onDeleteClick = () => {
    onDelete();
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} modalStyle={{ width: 350, height: 175 }}>
      <div className={styles.title}>Удалить задачу?</div>
      <button className={styles.closeBtn} onClick={handleClick} aria-label='Закрыть'><CloseIcon /></button>
      <button className={styles.deleteBtn} onClick={onDeleteClick}>Удалить</button>
      <button className={styles.cancelBtn} onClick={handleClick}>Отмена</button>
    </Modal>
  );
}
