import { useState } from 'react';

import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import DeleteIcon from '@mui/icons-material/Delete';

import DateSelector from './DateSelector';
import TimeSelector from './TimeSelector';
import styles from '../styles/Tasks.module.css';
import { useAppContext } from '../lib/context';
import { formatDate, formatTime } from '../lib/datetime';

export default function TasksView() {
  const context = useAppContext();

  const createTask = (task) => {
    const id = Math.max(...[...Object.keys(context.content), 0]) + 1;

    context.setContent({
      ...context.content,
      [id]: {
        ...task,
        id
      }
    });
  };

  const removeTask = (id) => {
    const {[id]: _, ...newContent} = context.content; 
    context.setContent(newContent);
  };

  return (
    <div className={styles.container}>
      <div className={styles.tasks}>
        {Object.values(context.content).map((task) => <Task key={task.id} task={task} remove={() => removeTask(task.id)} />)}
        {Object.keys(context.content).length === 0 && <h3>No tasks here 🥳</h3>}
      </div>

      <NewTask onSubmit={createTask} />
    </div>
  );
}

function NewTask({onSubmit}) {
  const [content, setContent] = useState("");
  const [dueDate, setDueDate] = useState(null);
  const [dueTime, setDueTime] = useState(null);
  const [dueDateSelector, setDueDateSelector] = useState(null);
  const [dueTimeSelector, setDueTimeSelector] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    onSubmit({
      content,
      date: dueDate,
      time: dueTime
    });

    setContent("");
    setDueDate(null);
    setDueTime(null);
  };

  return (
    <>
      {dueDateSelector &&
        <DateSelector
        left={dueDateSelector[0]}
        top={dueDateSelector[1]}
        onClose={() => setDueDateSelector(null)}
        onSubmit={(date) => {
          setDueDate(date);
          setDueDateSelector(null);
        }}
        />
      }

      {dueTimeSelector &&
        <TimeSelector
        left={dueTimeSelector[0]}
        top={dueTimeSelector[1]}
        onClose={() => setDueTimeSelector(false)}
        onSubmit={(time) => {
          setDueTime(time);
          setDueTimeSelector(false);
        }}
        />
      }

      <div className={styles.input}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <input
          className={styles.text}
          value={content}
          onChange={(event) => setContent(event.target.value)}
          />
        </form>

        <button
        className={styles.button}
        onClick={(event) => setDueDateSelector([event.clientX, event.clientY])}
        >
          <CalendarMonthIcon  />
        </button>

        <button
        className={styles.button}
        onClick={(event) => setDueTimeSelector([event.clientX, event.clientY])}
        >
          <AccessTimeIcon />
        </button>
      </div>
    </>
  );
}

function Task({task, remove}) {
  const [hover, setHover] = useState(false);

  return (
    <div
    className={styles.task}
    onMouseOver={() => setHover(true)}
    onMouseOut={() => setHover(false)}
    >
      <input type="checkbox" className={styles.check} />
      <div className={styles.content}>
        <b>{task.content}</b>
        <p>
          {task.date && formatDate(task.date)}
          {(task.date || task.time) && ' '}
          {task.time && formatTime(task.time)}
        </p>
      </div>
      {hover &&
        <button className={styles.delete} onClick={remove}>
          <DeleteIcon fontSize="small" />
        </button>
      }
    </div>
  );
}
