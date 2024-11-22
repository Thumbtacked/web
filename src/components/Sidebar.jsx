import { useState } from 'react';

import AddIcon from '@mui/icons-material/Add';
import AddBoxIcon from '@mui/icons-material/AddBox';
import DeleteIcon from '@mui/icons-material/Delete';
import DescriptionIcon from '@mui/icons-material/Description';
import FolderIcon from '@mui/icons-material/Folder';
import SearchIcon from '@mui/icons-material/Search';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import TaskAltIcon from '@mui/icons-material/TaskAlt';

import CreatePage from './CreatePage';
import styles from '../styles/Sidebar.module.css';
import { useAppContext } from '../lib/context';

export default function Sidebar() {
  const context = useAppContext();
  const [newPage, setNewPage] = useState(null);

  return (
    <>
      {newPage && <CreatePage parent={newPage.parent} close={() => setNewPage(null)}/>}
      <div className={styles.container}>
        <button className={styles.search}>
          Search <SearchIcon fontSize="small" />
        </button>

        {Object.values(context.pages).filter(page => (!page.parent)).map((page =>
          <Page
          key={page.id}
          level={1}
          page={page}
          setNewPage={setNewPage}
          />
        ))}

        <div
        className={styles.plus}
        onClick={() => setNewPage({parent: null})}
        >
          <AddIcon fontSize="small" />
        </div>
      </div>
    </>
  );
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
        paddingLeft: `${5 + (15 * (level - 1))}px`
      }}
      >
        {page.type === 0 && <SpaceDashboardIcon fontSize="small" />}
        {page.type === 1 && <TaskAltIcon fontSize="small" />}
        {page.type === 2 && <DescriptionIcon fontSize="small" />}
        {page.type === 3 && <FolderIcon fontSize="small" />}

        <p className={styles.title}>{page.title}</p>

        {hover &&
          <>
            <button
            className={styles.create}
            onClick={(event) => {
              setNewPage({parent: page.id});
              event.stopPropagation();
            }}
            >
              <AddBoxIcon fontSize="small" /> 
            </button>

            <button
            className={styles.delete}
            onClick={(event) => {
              event.stopPropagation();
              context.remove(page.id);
            }}
            >
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
  );
}
