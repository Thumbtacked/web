import { useEffect, useState } from 'react';

import styles from '../styles/Alert.module.css';

export default function Alert({message, onClose}) {
  const [removal, setRemoval] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setRemoval(true);
      setTimeout(onClose, 300);
    }, 4500);

    return () => clearTimeout(timeout);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={removal ? styles.removal : styles.container}>
      <p>{message}</p>
    </div>
  );
}
