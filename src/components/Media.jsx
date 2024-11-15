import { useState } from 'react';

import Widget from './Widget';
import Editable from './Editable';
import styles from '../styles/Media.module.css';
import { useAppContext } from '../lib/context';

export default function Media({item, update}) {
  const context = useAppContext();
  const [hover, setHover] = useState(false);
  const [loading, setLoading] = useState(false);

  const loadEmbed = async (url) => {
    if (!import.meta.env.VITE_APP_EMBEDS_BASE_URL) {
      return context.setAlert("No proxy is configured to fetch metadata.");
    }

    setLoading(true);

    let response;

    try {
      response = await fetch(`${import.meta.env.VITE_APP_EMBEDS_BASE_URL}/metadata?url=${url}`);
    } catch {
      setLoading(false);
      return context.setAlert("Failed to reach remote server. Check your connection.");
    }

    const content = await response.json();
    setLoading(false);

    if (response.status !== 200) {
      return context.setAlert(content.error);
    }

    update({content: content});
  }

  return (
    <Widget item={item} update={update} hover={hover} setHover={setHover}>
      {item.content ?
        <>
          {item.content.image &&
            <img
            className={styles.image}
            src={`${import.meta.env.VITE_APP_EMBEDS_BASE_URL}/fetch?url=${item.content.image}`}
            alt=""
            loading="lazy"
            />
          }

          <div className={styles.header}>
            {item.content.favicon &&
              <img
              className={styles.favicon}
              src={`${import.meta.env.VITE_APP_EMBEDS_BASE_URL}/fetch?url=${item.content.favicon}`}
              alt=""
              loading="lazy"
              />
            }

            <a
            className={styles.url}
            href={item.content.url}
            target="_blank"
            rel="noopener noreferrer"
            >
              {item.content.url}
            </a>
          </div>

          <p className={styles.title}>{item.content.title}</p>
          <p className={styles.description}>{item.content.description}</p>
        </>
      :
        (loading ?
          <div className={styles.load} />
        :
          <Editable
          inline
          defaultValue="Insert link here..."
          submitEmpty={false}
          onSubmit={(url) => loadEmbed(url)}
          />
        )
      }

    </Widget>
  )
}

