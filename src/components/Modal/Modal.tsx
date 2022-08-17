import React, { FC, ReactNode, useRef } from 'react';
import { createPortal } from 'react-dom';
import styles from './modal.module.scss';
import { CSSTransition } from 'react-transition-group';
import classNames from 'classnames';

interface IModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  transitionClasses?: object;
  overlayStyle?: 'blur' | 'dark';
  modalStyle?: object;
}

const transitionStyles = {
  enter: styles['modal-enter'],
  enterActive: styles['modal-enter-active'],
  exit: styles['modal-exit'],
  exitActive: styles['modal-exit-active']
};

export const Modal: FC<IModalProps> = ({ open, onClose, children, transitionClasses = transitionStyles, overlayStyle = 'dark', modalStyle = {} }: IModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const node = document.getElementById('modal_root');
  if (!node) return null;

  const handleOverlayClick = (e: React.SyntheticEvent) => {
    if (e.target instanceof Node && !modalRef.current?.contains(e.target)) {
      e.stopPropagation();
      onClose();
    }
  };

  const wrapperClasses = classNames(styles.modalWrapper, {
    [styles.overlayBlur]: overlayStyle === 'blur',
    [styles.overlayDark]: overlayStyle === 'dark',
  });

  return createPortal((
    <CSSTransition
      in={open}
      timeout={200}
      classNames={transitionClasses}
      mountOnEnter
      unmountOnExit
    >
      <div className={wrapperClasses} onClick={handleOverlayClick}>
        <div className={styles.modal} ref={modalRef} style={modalStyle}>
          {children}
        </div>
      </div>
    </CSSTransition>
  ), node);
}
