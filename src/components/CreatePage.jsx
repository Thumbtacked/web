import {useState, useRef} from 'react';

import Modal from './Modal';
import styles from '../styles/CreatePage.module.css';
import { useAppContext } from '../lib/context';

const intialContent = {
  0: {"items": {}, "layout": []},
  1: [],
  2: "",
  3: null
};

export default function CreatePage({close, parent}) {
  const context = useAppContext();

  const [title, setTitle] = useState("");
  const select = useRef();

  const onSubmit = (event) => {
    event.preventDefault();

    if (!title) {
      return;
    }

    context.create({
      title: title,
      type: parseInt(select.current.value),
      content: intialContent[parseInt(select.current.value)],
    }, parent);

    close();
  };

  return (
    <Modal onClose={close}>
      <form className={styles.container} onSubmit={onSubmit}>
        <div className={styles.header}>
          <b>New Section</b>
        </div>

        <div className={styles.body}>
          <div className={styles.section}>
            <p className={styles.label}>Title</p>
            <input onChange={(event) => setTitle(event.target.value)} placeholder="Type here..." />
          </div>

          <div className={styles.section}>
            <p className={styles.label}>Type</p>
            <select ref={select}>
                <option value={0}>Board</option>
                <option value={1}>Tasks</option>
                <option value={2}>Document</option>
                <option value={3}>Folder</option>
            </select>
          </div>

          <div className={styles.submit}>
            <button onClick={close} type="button">Cancel</button>
            <button type="submit">Create</button>
          </div>
        </div>
      </form>
    </Modal>
  )
}
