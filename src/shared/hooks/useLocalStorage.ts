import { useEffect, useState } from 'react';

export const useLocalStorage = (
  key: string,
  defValue: string
): [string, (state: string) => void] => {
  const hasWindow = typeof window !== 'undefined';
  const getLocalStorageItem = () => {
    return hasWindow ? window.localStorage.getItem(key) ?? defValue : defValue;
  };

  const [state, setState] = useState(getLocalStorageItem());
  const setValue = (value: string) => {
    if (hasWindow) window.localStorage.setItem(key, state);
    setState(value);
  };

  useEffect(() => {
    if (hasWindow) window.localStorage.setItem(key, state);
  }, [key, state]);

  // useEffect(() => {
  //   setState(getLocalStorageItem());
  // }, []);

  return [state, setValue];
};
