import Alert from './Alert';
import BoardView from './Board';
import Sidebar from './Sidebar';
import TasksView from './Tasks';
import styles from '../styles/Home.module.css';
import { useAppContext } from '../lib/context';

export default function Home() {
  const context = useAppContext();

  return (
    <div className={styles.container}>
      {context.alert &&
        <Alert message={context.alert} onClose={() => context.setAlert(null)} />
      }
      <Sidebar />

      {(context.view === 0 || context.page?.type === 0) && <BoardView />}
      {(context.view === 1 || context.page?.type=== 1) && <TasksView />}
    </div>
  )
}
