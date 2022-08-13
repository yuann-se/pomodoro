import React, { ReactNode, useRef } from 'react';
import { createPortal } from 'react-dom';
import styles from './timeoutmsg.module.scss';
import { CSSTransition } from 'react-transition-group';

interface ITimeoutMsgProps {
  message: ReactNode;
  open: boolean;
  onClose: () => void;
}

const transitionClasses = {
  enter: styles['modal-enter'],
  enterActive: styles['modal-enter-active'],
  exit: styles['modal-exit'],
  exitActive: styles['modal-exit-active']
}

export function TimeoutMsg({ message, open, onClose }: ITimeoutMsgProps) {
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
          {message}
          <button className={styles.closeBtn} onClick={handleClick}>Ок!</button>
        </div>
      </div>
    </CSSTransition>
  ), node);
}
