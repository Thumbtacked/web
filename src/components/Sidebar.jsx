import { useState, useRef } from 'react';

import AddBoxIcon from '@mui/icons-material/AddBox';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import DescriptionIcon from '@mui/icons-material/Description';
import FolderIcon from '@mui/icons-material/Folder';
import SearchIcon from '@mui/icons-material/Search'
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import TaskAltIcon from '@mui/icons-material/TaskAlt';

import Modal from './Modal';
import styles from '../styles/Sidebar.module.css';
import { useAppContext } from '../lib/context';

export default function Sidebar() {
  const context = useAppContext();
  const [newPage, setNewPage] = useState(null);

  return (
    <>
      {newPage && <NewPage parent={newPage.parent} close={() => setNewPage(null)}/>}
      <div className={styles.container}>
        <div className={styles.header}>
          <button className={styles.button} onClick={() => setNewPage({parent: null})}>
            New <CreateIcon fontSize="small" />
          </button>

          <button className={styles.button}>
            Search <SearchIcon fontSize="small" />
          </button>
        </div>

        <div
        onClick={() => context.showHome()}
        className={styles.view}
        style={context.view === 0 ? {backgroundColor:"rgba(0, 0, 0, 0.15)"} : {}}
        >
          Home
        </div>

        <div
        onClick={() => context.showTasks()}
        className={styles.view}
        style={context.view === 1 ? {backgroundColor:"rgba(0, 0, 0, 0.15)"} : {}}
        >
          Tasks
        </div>

        <p className={styles.pages}>Pages</p>

        {Object.values(context.pages).filter(page => (!page.parent)).map((page =>
          <Page
          key={page.id}
          level={1}
          page={page}
          setNewPage={setNewPage}
          />
        ))}

        {Object.values(context.pages).filter(page => (!page.parent)).length === 0 &&
          <div onClick={() => setNewPage({parent: null})} className={styles.page}>
            <CreateIcon fontSize="small" />
            <p>Click to start...</p>
          </div>
        }
      </div>
    </>
  )
}

function Page({page, level, setNewPage}) {
  const context = useAppContext();
  const [hover, setHover] = useState(false);

  return (
    <>
      <div
      onMouseOver={() => setHover(true)}
      onMouseOut={() => setHover(false)}
      onClick={page.type !== 3 ? (() => context.showPage(page.id)) : null}
      className={styles.page}
      style={{
        backgroundColor: context.page?.id === page.id ? "rgba(0, 0, 0, 0.15)" : "",
        paddingLeft: `${15 * level}px`
      }}
      >
        {page.type === 0 && <SpaceDashboardIcon fontSize="small" />}
        {page.type === 1 && <TaskAltIcon fontSize="small" />}
        {page.type === 2 && <DescriptionIcon fontSize="small" />}
        {page.type === 3 && <FolderIcon fontSize="small" />}

        <p className={styles.title}>{page.title}</p>

        {hover &&
          <>
            <button onClick={() => setNewPage({parent: page.id})} className={styles.create}>
              <AddBoxIcon fontSize="small" /> 
            </button>

            <button onClick={() => context.remove(page.id)} className={styles.delete}>
              <DeleteIcon fontSize="small" /> 
            </button>
          </>
        }
      </div>

      {page.children.map(child =>
        <Page
        key={child}
        level={level+1}
        page={context.pages[child]}
        setNewPage={setNewPage}
        />
      )}
    </>
  )
}

function NewPage({close, parent}) {
  const context = useAppContext();

  const [title, setTitle] = useState("");
  const select = useRef();

  const intialContent = {
    0: {"items": {}, "layout": []},
    1: [],
    2: "",
    3: null
  };

  const onSubmit = (event) => {
    event.preventDefault();

    if (!title) {
      return;
    }

    context.create({
      title: title,
      type: parseInt(select.current.value),
      content: intialContent[parseInt(select.current.value)],
    }, parent);

    close();
  }

  return (
    <Modal onClose={close}>
      <form className={styles.new} onSubmit={onSubmit}>
        <b>New Page</b>

        <input onChange={(event) => setTitle(event.target.value)} placeholder="Enter a title..." />

        <select ref={select}>
            <option value={0}>Board</option>
            <option value={1}>Tasks</option>
            <option value={2}>Document</option>
            <option value={3}>Folder</option>
        </select>

        <div className={styles.submit}>
          <button onClick={close} type="button">Cancel</button>
          <button type="submit">Create</button>
        </div>
      </form>
    </Modal>
  )
}
