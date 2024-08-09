import { useEffect, useState } from 'react';

export const useLocalStorage = (
  key: string,
  defValue: string
): [string, (state: string) => void] => {
  const hasWindow = typeof window !== 'undefined';

  const [state, setState] = useState(
    (hasWindow
      ? window.localStorage.getItem(key) ?? defValue
      : defValue) as string
  );

  useEffect(() => {
    if (hasWindow) window.localStorage.setItem(key, state);
  }, [key, state]);

  return [state, setState];
};
