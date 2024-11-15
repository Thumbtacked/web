import { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';

import Widget from './Widget';
import styles from '../styles/Table.module.css';
import { useAppContext } from '../lib/context';

export default function Table({item, update}) {
  const context = useAppContext();
  const [hover, setHover] = useState(false);

  const onCellUpdate = (event, row, column) => {
    const newItem = {...item};
    item.content.cells[row][column] = event.target.textContent;
    update(newItem);
  }
  
  const insertRow = () => {
    const newItem = {...item};
    newItem.content.cells.push([]);
    newItem.content.rows += 1;
    update(newItem);
  }
  
  const insertColumn = () => {
    const newItem = {...item};
    newItem.content.columns += 1;
    update(newItem);
  }

  return (
    <Widget item={item} update={update} hover={hover} setHover={setHover}>
      <div className={styles.container}>
        <table>
          <tbody valign="top">
            <tr>
              {Array.from({length: item.content.columns}).map((_, column) => (
                <th>
                  <p
                  className={styles.cell}
                  contentEditable
                  onBlur={(event) => onCellUpdate(event, 0, column)}
                  suppressContentEditableWarning={true}
                  >
                    {item.content.cells[0][column]}
                  </p>
                </th>
              ))}
              {hover &&
                <td className={styles.expansion} rowSpan={item.content.rows}>
                  <button onClick={insertColumn} className={styles.ecolumn}>
                    <AddIcon fontSize="small" />
                  </button>
                </td>
              }
              </tr>

            {Array.from({length: item.content.rows - 1}).map((e, row) => (
              <tr>
                {Array.from({length: item.content.columns}).map((e, column) => (
                  <td>
                    <p
                    className={styles.cell}
                    contentEditable
                    onBlur={(event) => onCellUpdate(event, item, row + 1, column, context.content.setItem)}
                    suppressContentEditableWarning={true}
                    >
                    {item.content.cells[row + 1][column]}
                    </p>
                  </td>
                ))}
              </tr>
            ))}
            {hover &&
              <tr>
                <td className={styles.expansion} colSpan={item.content.columns}>
                  <button onClick={insertRow} className={styles.erow}>
                    <AddIcon fontSize="small" />
                  </button>
                </td>
              </tr>
            }
            </tbody>
        </table>
      </div>
    </Widget>
  )
}
