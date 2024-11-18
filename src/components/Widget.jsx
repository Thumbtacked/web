import { useState, useRef, useEffect } from 'react';
import { HexColorPicker, HexColorInput } from 'react-colorful';

import MoreVertIcon from '@mui/icons-material/MoreVert';

import ContextMenu from './ContextMenu';
import Editable from './Editable';
import styles from '../styles/Widget.module.css';
import { useAppContext } from '../lib/context';
import { startMouseDrag, startTouchDrag } from '../lib/drag';

export default function Widget({item, update, hover, setHover, children}) {
  const context = useAppContext();

  const [editHeader, setEditHeader] = useState(false);
  const [colorPicker, setColorPicker] = useState(null);
  const [menu, setMenu] = useState(null);
  const widget = useRef();

  useEffect(() => {
    const observer = new ResizeObserver(mutations => {
      const width = mutations[0].contentRect.width;
      const height = mutations[0].contentRect.height;

      if (item.width === width && item.height === height) {
        return;
      }

      update({
        width: mutations[0].contentRect.width,
        height: mutations[0].contentRect.height
      });
    });
    observer.observe(widget.current);
    return () => observer.disconnect();
  });

  const moveForward = () => {
    const index = context.content.layout.indexOf(item.id);

    if (index < context.content.layout.length - 1) {
      const newLayout = [...context.content.layout];
      [newLayout[index+1], newLayout[index]] = [newLayout[index], newLayout[index+1]]
      context.setContent({
        ...context.content,
        layout: newLayout
      });
    }
  };

  const moveBackward = () => {
    const index = context.content.layout.indexOf(item.id);

    if (index > 0) {
      const newLayout = [...context.content.layout];
      [newLayout[index-1], newLayout[index]] = [newLayout[index], newLayout[index-1]];
      context.setContent({
        ...context.content,
        layout: newLayout
      });
    }
  };

  const remove = () => {
    const {[item.id]: _, ...newItems} = context.content.items;

    context.setContent({
      items: newItems,
      layout: context.content.layout.filter(id => id !== item.id)
    });
  };

  return (
    <>
      {colorPicker &&
        <ContextMenu
        left={colorPicker[0]}
        top={colorPicker[1]}
        onClose={() => setColorPicker(null)}
        >
          <div className={styles.color}>
            <HexColorPicker
            color={item.color ?? "#000000"}
            onChange={(color) => update({color: color})}
            />
            <HexColorInput
            prefixed
            color={item.color ?? "#000000"}
            onChange={(color) => update({color: color})}
            />
          </div>
        </ContextMenu>
      }

      {menu &&
        <ContextMenu
        left={menu[0]}
        top={menu[1]}
        onClick={() => setMenu(null)}
        onClose={() => setMenu(null)}>
          <div className={styles.options}>
            <button onClick={() => setEditHeader(true)}>Insert Title</button>
            <button onClick={() => setColorPicker(menu)}>Select Color</button>
            <button onClick={() => update({color: null})}>Reset Color</button>
            <button onClick={moveForward}>Bring Forward</button>
            <button onClick={moveBackward}>Bring Backward</button>
            <button onClick={remove}>Delete</button>
          </div>
        </ContextMenu>
      }

      <div
      className={styles.container}
      style={{
        top: item.top,
        left: item.left,
        width: `${item.width}px`,
        height: `${item.height}px`,
        backgroundColor: item.color
      }}
      onMouseOver={() => setHover(true)}
      onMouseOut={() => setHover(false)}
      ref={widget}
      >
        <div
        className={styles.topbar}
        onMouseDown={(event) => startMouseDrag(event, widget.current, (left, top) => update({left: left, top: top}))}
        onTouchStart={(event) => startTouchDrag(event, widget.current, (left, top) => update({left: left, top: top}))}
        >
          {hover &&
            <button 
            onClick={(event) => setMenu([event.clientX, event.clientY])}
            className={styles.button}
            >
              <MoreVertIcon fontSize="small" />
            </button>
          }
        </div>

        <div className={styles.header}>
          {(item.title || editHeader) &&
          <Editable
          value={item.title}
          defaultValue='Click here to add title...'
          inline={true}
          onEdit={(title) => update({title: title})}
          onSubmit={() => setEditHeader(false)}
          />}
        </div>

        <div className={styles.content}>
          {children}
        </div>
      </div>
    </>
  )
}
