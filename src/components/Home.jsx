import Alert from './Alert';
import BoardView from './Board';
import DocumentView from './Document';
import EmptyView from './Empty';
import Sidebar from './Sidebar';
import TasksView from './Tasks';
import styles from '../styles/Home.module.css';
import { useAppContext } from '../lib/context';

export default function Home() {
  const context = useAppContext();

  return (
    <>
      {context.alert && <Alert message={context.alert} onClose={() => context.setAlert(null)} />}

      <div className={styles.container}>
        <Sidebar />

        {Object.keys(context.pages).length === 0 && <EmptyView />}
        {context.page?.type === 0 && <BoardView />}
        {context.page?.type === 1 && <TasksView />}
        {context.page?.type === 2 && <DocumentView />}
      </div>
    </>
  );
}
