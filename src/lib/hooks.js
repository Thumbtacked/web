import { useState, useEffect } from "react"

export function useLocalStorage(key, defaultValue) { 
  const [value, setValue] = useState(JSON.parse(localStorage.getItem(key)) ?? defaultValue ?? {});

  useEffect(() => {
    const onUpdate = (event) => {
      if (event.key === key) {
        setValue(JSON.parse(event.newValue));
      }
    };
    window.addEventListener("storage", onUpdate);
    return () => window.removeEventListener("storage", onUpdate);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const setValueWithLocalStorage = (newValue) => {
    setValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue))
  };

  return [value, setValueWithLocalStorage];
}
