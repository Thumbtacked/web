import styles from '../styles/Empty.module.css';

export default function EmptyView() {
  return (
    <div className={styles.container}>
      <p className={styles.text}>Workspace has no pages yet</p>
    </div>
  );
}
