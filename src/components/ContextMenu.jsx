import { useRef, useState, useEffect } from 'react';
import styles from '../styles/ContextMenu.module.css';

export default function ContextMenu(props) {
  const [dimensions, setDimensions] = useState();
  const menu = useRef();

  const style = (
    dimensions ?
    {left: `min(${props.left}px, calc(100vw - ${dimensions.width}px - 10px))`, top: `min(${props.top}px, calc(100vh - ${dimensions.height}px - 10px))`}
    :
    {left: props.left, top: props.top}
  );

  useEffect(() => {
    const handleClose = (event) => {
      if (menu.current && !menu.current.contains(event.target)) {
        props.close();
      }
    };
  
    document.addEventListener("mousedown", handleClose);
    document.addEventListener("scroll", handleClose, true);
    return () => {
      document.removeEventListener("mousedown", handleClose);
      document.removeEventListener("scroll", handleClose, true);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (menu.current) {
      setDimensions(menu.current.getBoundingClientRect());
    }
  }, [menu])

  return (
    <div
    className={styles.container}
    ref={menu}
    style={style}
    onClick={props.onClick}>
      {props.children}
    </div>
  )
}
