import React, { useRef } from 'react';
import { createPortal } from 'react-dom';
import styles from './confirmdeletemodal.module.scss';
import { CSSTransition } from 'react-transition-group';
import { CloseIcon } from '../../../../../icons';

interface IConfirmDeleteModalProps {
  open: boolean;
  onClose: () => void;
  onDelete: () => void;
}

const transitionClasses = {
  enter: styles['modal-enter'],
  enterActive: styles['modal-enter-active'],
  exit: styles['modal-exit'],
  exitActive: styles['modal-exit-active']
}

export function ConfirmDeleteModal({ open, onClose, onDelete }: IConfirmDeleteModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  const node = document.getElementById('modal_root');
  if (!node) return null;

  const handleOverlayClick = (e: React.SyntheticEvent) => {
    if (e.target instanceof Node && !modalRef.current?.contains(e.target)) {
      e.stopPropagation();
      onClose();
    }
  }

  const handleClick = (e: React.SyntheticEvent) => {
    e.stopPropagation();
    onClose();
  }

  const onDeleteClick = () => {
    onDelete();
    onClose();
  }

  return createPortal((
    <CSSTransition
      in={open}
      timeout={200}
      classNames={transitionClasses}
      mountOnEnter
      unmountOnExit
      nodeRef={modalRef}
    >
      <div className={styles.modalWrapper} onClick={handleOverlayClick}>
        <div className={styles.modal} ref={modalRef}>
          <div>Удалить задачу?</div>
          <button className={styles.closeBtn} onClick={handleClick} aria-label='Закрыть'><CloseIcon /></button>
          <button className={styles.deleteBtn} onClick={onDeleteClick}>Удалить</button>
          <button className={styles.cancelBtn} onClick={handleClick}>Отмена</button>
        </div>
      </div>
    </CSSTransition>
  ), node);
}
