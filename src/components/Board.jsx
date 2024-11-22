
import AttachFileIcon from '@mui/icons-material/AttachFile';
import ChecklistIcon from '@mui/icons-material/Checklist';
import StickyNote2Icon from '@mui/icons-material/StickyNote2';
import TableViewIcon from '@mui/icons-material/TableView';

import List from './List';
import Media from './Media';
import Note from './Note';
import Table from './Table';
import styles from '../styles/Board.module.css';
import { useAppContext } from '../lib/context';

export default function Board() {
  const context = useAppContext();

  const widgetMap = {
    "list": List,
    "media": Media,
    "note": Note,
    "table": Table
  };

  const rights = Object.values(context.content.items).map(item => item.left + item.width);
  const bottoms = Object.values(context.content.items).map(item => item.top + item.height);
  const width = Math.max(...rights) + 10;
  const height = Math.max(...bottoms) + 10;

  const createItem = (data) => {
    const item = {
      id: Math.max(...[...Object.keys(context.content.items), 0]) + 1,
      title: null,
      width: 275,
      height: 275,
      top: 10,
      left: 10,
      color: null,
      ...data
    };

    context.setContent({
      items: {...context.content.items, [item.id]: item},
      layout: [...context.content.layout, item.id]
    });
  };

  const updateItem = (id, item) => {
    context.setContent({
      ...context.content,
      items: {...context.content.items, [id]: {...context.content.items[id], ...item}}
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.toolbar}>
        <button
        onClick={() => createItem({content: "", type: "note"})}
        className={styles.button}
        title="Insert a sticky note"
        >
          <StickyNote2Icon fontSize="small" />
        </button>

        <button
        onClick={() => createItem({content: [], type: "list"})}
        className={styles.button}
        title="Insert a checklist"
        >
          <ChecklistIcon fontSize="small" />
        </button>

        <button
        onClick={() => createItem({content: {rows: 2, columns: 2, cells: [[], []]}, type: "table"})}
        className={styles.button}
        title="Insert a table"
        >
          <TableViewIcon fontSize="small" />
        </button>

        <button
        onClick={() => createItem({content: null, type: "media"})}
        className={styles.button}
        title="Insert an embeded link"
        >
          <AttachFileIcon fontSize="small" />
        </button>
      </div>

      <div className={styles.outer}>
        <div className={styles.inner} style={{width: `${width}px`, height: `${height}px`}}>
          {context.content.layout.map((id) => {
            const item = context.content.items[id];
            const Widget = widgetMap[item.type];
            return (
              <Widget
              key={item.id}
              item={item}
              update={(newItem) => updateItem(item.id, newItem)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
