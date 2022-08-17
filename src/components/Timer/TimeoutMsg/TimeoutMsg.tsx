import React, { ReactNode } from 'react';
import styles from './timeoutmsg.module.scss';
import { Modal } from '../../Modal';

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

  const handleClick = (e: React.SyntheticEvent) => {
    e.stopPropagation();
    onClose();
  }

  return (
    <Modal open={open} onClose={onClose} transitionClasses={transitionClasses} overlayStyle='blur' modalStyle={{ maxWidth: 500, padding: '80px 40px 40px', }}>
      <div className={styles.message}>{message}</div>
      <button className={styles.closeBtn} onClick={handleClick}>Ок!</button>
    </Modal>
  );
}
