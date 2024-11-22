import { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';

import Editable from './Editable';
import Widget from './Widget';
import styles from '../styles/Table.module.css';

export default function Table({item, update}) {
  const [hover, setHover] = useState(false);

  const onCellUpdate = (value, row, column) => {
    const newItem = {...item};
    item.content.cells[row][column] = value;
    update(newItem);
  };
  
  const insertRow = () => {
    const newItem = {...item};
    newItem.content.cells.push([]);
    newItem.content.rows += 1;
    update(newItem);
  };
  
  const insertColumn = () => {
    const newItem = {...item};
    newItem.content.columns += 1;
    update(newItem);
  };

  return (
    <Widget item={item} update={update} hover={hover} setHover={setHover}>
      <div className={styles.container}>
        <table>
          <tbody valign="top">
            <tr>
              {Array.from({length: item.content.columns}).map((_, column) => (
                <th key={(0, column)}>
                  <Editable
                  className={styles.cell}
                  value={item.content.cells[0][column]}
                  placeholder=""
                  onChange={(value) => onCellUpdate(value, 0, column)}
                  />
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
              <tr key={row + 1}>
                {Array.from({length: item.content.columns}).map((e, column) => (
                  <td key={(row + 1, column)}>
                    <Editable
                    className={styles.cell}
                    placeholder=""
                    value={item.content.cells[row + 1][column]}
                    onChange={(value) => onCellUpdate(value, row + 1, column)}
                    />
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
  );
}
