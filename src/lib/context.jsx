import { createContext, useContext, useState } from 'react';
import { useLocalStorage } from './hooks';

const AppContext = createContext();

export function AppProvider({children}) {
  const [pages, setPages] = useLocalStorage("pages", {
    1: {
      id: 1,
      title: "Home",
      type: 0,
      content: {
        items: {},
        layout: []
      },
      parent: null,
      children: []
    },
    2: {
      id: 2,
      title: "Tasks",
      type: 1,
      content: [],
      parent: null,
      children: []
    }
  });

  const [current, setCurrent] = useState(Object.keys(pages)[0]);
  const [alert, setAlert] = useState();

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

      if (id === current) {
        setCurrent(Object.keys(pages)[0]);
      }
    },
    content: pages[current].content,
    setContent: (newContent) => {
      setPages({...pages, [current]: {...pages[current], content: newContent}})
    },
    showPage: setCurrent,
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
