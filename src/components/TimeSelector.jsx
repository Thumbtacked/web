import { useState } from 'react';

import ContextMenu from './ContextMenu';
import styles from '../styles/TimeSelector.module.css';

export default function TimeSelector({left, top, onClose, onSubmit}) {
  const [content, setContent] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = () => {
    event.preventDefault();
    const result = content.match("^([0-2]?[0-9]):([0-5]?[0-9])$");

    if (!result) {
      setError(true);
    } else {
      onSubmit({"hours": result[1], "minutes": result[2]});
    }
  };
  
  return (
    <ContextMenu
    left={left}
    top={top}
    onClose={onClose}
    >
      <div className={styles.container}>
        <p className={styles.label}>Choose a time</p>
        <form onSubmit={handleSubmit}>
          <input
          style={error ? {border: "1px solid #fc5a5a"}: {}}
          className={styles.input}
          value={content}
          onChange={(event) => setContent(event.target.value)}
          placeholder="HH:MM"
          /> 
        </form>
      </div>
    </ContextMenu>
  );
}
