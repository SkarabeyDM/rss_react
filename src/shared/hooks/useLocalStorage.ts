import { useEffect, useState } from 'react';

export const useLocalStorage = (
  key: string,
  defValue: string
): [string, (state: string) => void] => {
  const [state, setState] = useState(localStorage.getItem(key) ?? defValue);

  useEffect(() => {
    localStorage.setItem(key, state);
  }, [key, state]);

  return [state, setState];
};
