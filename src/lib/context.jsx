import { createContext, useContext, useState } from 'react';
import { useLocalStorage } from './hooks';

const AppContext = createContext();

export function AppProvider({children}) {
  const [home, setHome] = useLocalStorage("home", {"items": {}, "layout": []});
  const [tasks, setTasks] = useLocalStorage("tasks", []);
  const [pages, setPages] = useLocalStorage("pages", {});

  const [view, setView] = useState(0);
  const [current, setCurrent] = useState(null);
  const [alert, setAlert] = useState();

  const views = {
    0: {get: home, set: (newContent) => setHome(newContent)},
    1: {get: tasks, set: (newContent) => setTasks(newContent)},
    2: {
      get: pages[current]?.content,
      set: (newContent) => setPages({...pages, [current]: {...pages[current], content: newContent}})
    }
  };

  const value = {
    alert,
    setAlert,
    pages,
    create: (page, parent) => {
      const id = Math.max(...[...Object.keys(pages), 0]) + 1;
      setPages({
        ...pages,
        [id]: {
          ...page,
          id,
          parent,
          children: []
        },
        ...(parent && {
          [parent]: {
            ...pages[parent],
            children: [...pages[parent].children, id]
          }
        })
      });
    },
    remove: (id) => {
      const {[id]: oldPage, ...newPages} = pages;

      if (oldPage.parent) {
        newPages[oldPage.parent].children = newPages[oldPage.parent].children.filter(child => child !== id);
      }

      const _collect = (page) => {
        page.children.forEach(child => {
          _collect(newPages[child]);
          delete newPages[child];
        });
      };

      _collect(oldPage);
      setPages(newPages);
    },
    showHome: () => {
      setCurrent(null);
      setView(0);
    },
    showTasks: () => {
      setCurrent(null);
      setView(1);
    },
    showPage: (id) => {
      setCurrent(id);
      setView(2);
    },
    content: views[view].get,
    setContent: views[view].set,
    view: view,
    page: pages[current],
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
