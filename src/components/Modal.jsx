import { useRef } from 'react';
import styles from '../styles/Modal.module.css';

export default function Modal({children, onClose}) {
  const content = useRef();

  const handleClose = (event) => {
    if (content.current && !content.current.contains(event.target)) {
      onClose();
    }
  };

  return (
    <div className={styles.overlay} onClick={handleClose}>
      <div className={styles.content} ref={content}>
        {children}
      </div>
    </div>
  );
}
