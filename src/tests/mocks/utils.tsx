/* eslint-disable import/no-extraneous-dependencies */
import { type Store, type RootState, setupStore } from '@shared/store';
import { ThemeProvider } from '@shared/themes';
import type { RenderOptions } from '@testing-library/react';
import { render } from '@testing-library/react';
import type { PropsWithChildren, ReactNode } from 'react';
import React from 'react';
import { Provider } from 'react-redux';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';

interface RenderWithProvidersOptions extends RenderOptions {
  preloadedState?: RootState;
  store?: Store;
  router?: boolean;
}

export function renderWithProviders(
  ui: ReactNode,
  {
    preloadedState,
    store = setupStore(preloadedState),
    router = true,
    ...renderOptions
  }: RenderWithProvidersOptions = {}
) {
  function Wrapper({ children }: PropsWithChildren) {
    const rtr = createMemoryRouter([{ path: '/', element: children }]);

    return (
      <React.StrictMode>
        <Provider store={store}>
          <ThemeProvider>
            {router ? <RouterProvider router={rtr} /> : children}
          </ThemeProvider>
        </Provider>
      </React.StrictMode>
    );
  }
  const rendered = render(ui, {
    wrapper: Wrapper,
    ...renderOptions,
  });

  return { ...rendered, store };
}
