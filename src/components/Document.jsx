import Editable from './Editable';
import styles from '../styles/Document.module.css';
import { useAppContext } from "../lib/context";

export default function DocumentView() {
  const context = useAppContext();

  const onTitleUpdate = (title) => {
    if (title) {
      context.set(context.page.id, {title});
    }
  };

  return (
    <div className={styles.container}>
      <h1>
        <Editable
        inline
        value={context.page.title}
        onChange={onTitleUpdate}
        />
      </h1>

      <Editable
      value={context.content}
      placeholder="Start typing here..."
      onChange={(value) => context.setContent(value)}
      />
    </div>
  );
}
