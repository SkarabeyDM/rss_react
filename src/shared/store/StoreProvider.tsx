'use client';

import type { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import { wrapper } from './store';

export function StoreProvider({ children }: PropsWithChildren) {
  const store = wrapper.useStore();
  return <Provider store={store}>{children}</Provider>;
}
