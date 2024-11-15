import { useState } from 'react';

import Widget from './Widget';
import Editable from './Editable';
import styles from '../styles/List.module.css';

export default function List({item, update}) {
  const [hover, setHover] = useState(false);
  const [inputValue, setInputValue] = useState();

  const onEdit = (index, text) => {
    const newItem = {...item};
    text ? newItem.content[index].text = text : newItem.content.splice(index, 1);
    update(newItem);
  }  

  const onCheck = (index, event) => {
    const newItem = {...item};
    newItem.content[index].checked = event.target.checked;
    update(newItem);
  }

  return (
    <Widget item={item} update={update} hover={hover} setHover={setHover}>
      {item.content.map((line, index) => (
        <div className={styles.item}>
          <input checked={line.checked} onChange={(event) => onCheck(index, event)} type="checkbox" />
          <Editable
          className={styles.value}
          value={line.text}
          inline={true}
          onEdit={(text) => onEdit(index, text)}
          />
        </div>
      ))}

      {(hover || item.content.length === 0 || inputValue) &&
        <div className={styles.item}>
          <input disabled type="checkbox" />
          <Editable
          className={styles.editable}
          submitEmpty={false}
          inline={true}
          value={inputValue}
          onEdit={(text) => setInputValue(text)}
          onSubmit={(text) => {
            update({content: [...item.content, {checked: false, text: text}]});
            setInputValue(null);
          }}
          />
        </div>
      }
    </Widget>
  )
}
