'use client';

import { useRef, type PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import type { Store } from './store';
import { setupStore } from './store';

export function StoreProvider({ children }: PropsWithChildren) {
  const storeRef = useRef<Store>();
  if (!storeRef.current) {
    storeRef.current = setupStore();
  }
  return <Provider store={storeRef.current}>{children}</Provider>;
}
