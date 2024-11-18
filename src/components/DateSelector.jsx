import { useState } from 'react';

import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

import ContextMenu from './ContextMenu';
import styles from '../styles/DateSelector.module.css';

const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

export default function DateSelector({left, top, onClose, onSubmit}) {
  const [current, setCurrent] = useState(new Date());
  const firstDay = new Date(current.getFullYear(), current.getMonth()).getDay();
  const monthLength = new Date(current.getFullYear(), current.getMonth() + 1, 0).getDate();

  const showPreviousMonth = () => {
    setCurrent(new Date(current.getFullYear(), current.getMonth() - 1));
  }

  const showNextMonth = () => {
    setCurrent(new Date(current.getFullYear(), current.getMonth() + 1));
  }

  return (
    <ContextMenu
    left={left}
    top={top}
    onClose={onClose}
    >
      <div className={styles.container}>
        <div className={styles.header}>
          <p className={styles.month}>
            {current.toLocaleString("default", {month: "long", year: "numeric"})}
          </p>

          <div className={styles.controls}>
            <button className={styles.control} onClick={showPreviousMonth}>
              <KeyboardArrowLeftIcon />
            </button>

            <button className={styles.control} onClick={showNextMonth}>
              <KeyboardArrowRightIcon />
            </button>
          </div>
        </div>

        <div className={styles.days}>
            {days.map((day, i) => <p key={i} className={styles.day}>{day}</p>)}
        </div>

        <div className={styles.calendar}>
          {[...Array(firstDay).keys()].map(i =>
            <div key={i} className={styles.empty} />
          )}
          {[...Array(monthLength).keys()].map(i =>
            <p
            key={i}
            className={styles.date}
            onClick={() => onSubmit({
              year: current.getFullYear(),
              month: current.getMonth(),
              date: i + 1
            })}
            >
              {i + 1}
            </p>
          )}
        </div>

        <button className={styles.relative}>Today</button>
        <button className={styles.relative}>Tomorrow</button>
        <button className={styles.relative}>Next Week</button>
      </div>
    </ContextMenu>
  );
}