import { useState } from 'react';

import DeleteIcon from '@mui/icons-material/Delete';

import styles from '../styles/Tasks.module.css';
import { useAppContext } from '../lib/context';

export default function TasksView() {
  const context = useAppContext();

  const [inputValue, setInputValue] = useState("");
  const [dueDate, setDueDate] = useState();

  const createTask = (content, due) => {
    const task = {id: Math.max(...[...Object.keys(context.content), 0]) + 1, content, due}
    context.setContent({...context.content, [task.id]: task});
  };

  const removeTask = (id) => {
    const {[id]: _, ...newContent} = context.content; 
    context.setContent(newContent);
  };

  const onInputSubmit = (event) => {
    event.preventDefault();

    if (inputValue) {
      createTask(inputValue, dueDate ? dueDate.$d : null);
      setInputValue("");
      setDueDate(null);
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.tasks}>
        {Object.values(context.content).map((task) => <Task key={task.id} task={task} remove={() => removeTask(task.id)} />)}
        {Object.keys(context.content).length === 0 && <h3>No tasks here 🥳</h3>}
      </div>

      <div className={styles.input}>
        <input
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
        onSubmit={onInputSubmit}
        />
      </div>
    </div>
  )
}

function Task({task, remove}) {
  const [hover, setHover] = useState(false);
  const due = new Date(task.due);

  return (
    <div
    className={styles.task}
    onMouseOver={() => setHover(true)}
    onMouseOut={() => setHover(false)}
    >
      <input type="checkbox" className={styles.check} />
      <div className={styles.content}>
        <b>{task.content}</b>
        {task.due && <p>{due.toLocaleDateString()} at {due.toLocaleTimeString()}</p>}
      </div>
      {hover &&
        <button className={styles.delete} onClick={remove}>
          <DeleteIcon fontSize="small" />
        </button>
      }
    </div>
  )
}
