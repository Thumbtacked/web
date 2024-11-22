import { useRef, useState, useEffect } from 'react';
import styles from '../styles/ContextMenu.module.css';

export default function ContextMenu({left, top, onClose, onClick, children}) {
  const [dimensions, setDimensions] = useState(null);
  const menu = useRef();

  const style = (
    dimensions ?
    {
      left: `min(${left}px, calc(100vw - ${dimensions.width}px - 10px))`,
      top: `min(${top}px, calc(100vh - ${dimensions.height}px - 10px))`
    }
    :
    {
      visibility: "hidden"
    }
  );

  useEffect(() => {
    const handleClose = (event) => {
      if (menu.current && !menu.current.contains(event.target)) {
        onClose();
      }
    };
  
    document.addEventListener("mousedown", handleClose);
    document.addEventListener("scroll", handleClose, true);
    return () => {
      document.removeEventListener("mousedown", handleClose);
      document.removeEventListener("scroll", handleClose, true);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (menu.current) {
      setDimensions(menu.current.getBoundingClientRect());
    }
  }, [children]);

  return (
    <div
    className={styles.container}
    ref={menu}
    style={style}
    onClick={onClick}>
      {children}
    </div>
  );
}
