import { useState, useRef, useEffect } from 'react';
import styles from '../styles/Editable.module.css';

export default function Editable({inline, value, placeholder, onChange}) {
  const [editing, setEditing] = useState(false);
  const editable = useRef();

  useEffect(() => {
    if (editing) {
      editable.current.focus();
    }
  }, [editing]);

  return (
    <>
      {(editing || value) ? 
        <p
        contentEditable
        suppressContentEditableWarning
        className={styles.input}
        spellCheck={false}
        ref={editable}
        onKeyDown={(event) => {
          if (event.key === "Enter" & inline === true) {
            event.preventDefault();
            event.target.blur();
          }
        }}
        onFocus={(event) => {
          event.target.spellcheck = true;
        }}
        onBlur={(event) => {
          event.target.spellcheck = false;
          onChange(event.target.textContent);
          setEditing(false);
        }}
        >
          {value}
        </p>
      :
        <p
        className={styles.placeholder}
        onClick={() => setEditing(true)}
        >
          {placeholder}
        </p>
      }
    </>
  );
}
