import { useState } from 'react';
import styles from '../styles/Editable.module.css';

export default function Editable({value, defaultValue, inline, submitEmpty, onEdit, onSubmit, selected}) {
  const [edit, setEdit] = useState(false);

  return (
    <>
      {edit ?
      <textarea
      className={styles.input}
      onInput={(event) => {
        if (onEdit) {
          onEdit(event.target.value);
        }
        event.target.style.height = "0px";
        event.target.style.height = `${event.target.scrollHeight}px`;
      }}
      onKeyDown={(event) => {
        if (event.key === "Enter" & (inline === true)) {
          event.preventDefault();
          event.target.blur();
        }
      }}
      onBlur={(event) => {
        if (onSubmit) {
          if (!(submitEmpty === false) || event.target.value) {
            onSubmit(event.target.value);
          }
        }
        setEdit(false);
      }}
      onFocus={(event) => {
        event.target.style.height = "0px";
        event.target.style.height = `${event.target.scrollHeight}px`;
      }}
      value={value}
      autoFocus
      />
      :
      <p
      onClick={() => setEdit(true)}
      default-value={defaultValue ?? "Click here to edit..."}
      className={styles.text}
      >
        {value}
      </p>
      }
    </>
  )
}
