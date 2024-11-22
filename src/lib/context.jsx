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
  const [current, setCurrent] = useState(Object.keys(pages)[0] || null);
  const [alert, setAlert] = useState(null);

  const value = {
    alert,
    setAlert,
    pages,
    create: (page, parent) => {
      const id = Math.max(...[...Object.keys(pages), 0]) + 1;

      if (Object.keys(pages).length === 0) {
        setCurrent(id);
      }

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
        newPages[oldPage.parent] = {
          ...newPages[oldPage.parent],
          children: newPages[oldPage.parent].children.filter(child => child !== id)
        };
      }

      const removeChildren = (page) => {
        page.children.forEach(child => {
          removeChildren(newPages[child]);
          delete newPages[child];
        });
      };

      removeChildren(oldPage);
      setPages(newPages);

      if (current === id) {
        setCurrent(Object.keys(newPages)[0] || null);
      }
    },
    set: (id, newPage) => {
      setPages({
        ...pages,
        [id]: {
          ...pages[id],
          ...newPage
        }
      });
    }
    ,
    content: pages[current]?.content,
    setContent: (newContent) => {
      setPages({
        ...pages,
        [current]: {
          ...pages[current],
          content: newContent
        }
      });
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
