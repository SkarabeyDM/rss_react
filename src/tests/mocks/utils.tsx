/* eslint-disable react-compiler/react-compiler */
/* eslint-disable import/no-extraneous-dependencies */
import { type Store, type RootState, setupStore } from '@shared/store';
import { ThemeProvider } from '@shared/themes';
import type { RenderOptions } from '@testing-library/react';
import { render } from '@testing-library/react';
import type { PropsWithChildren, ReactNode } from 'react';
import React from 'react';
import { Provider } from 'react-redux';
import type { MemoryRouterProps } from 'react-router-dom';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';

interface RenderWithProvidersOptions extends RenderOptions {
  preloadedState?: RootState;
  store?: Store;
  router?: Omit<MemoryRouterProps, 'children'>;
  path?: string;
}

export function renderWithProviders(
  ui: ReactNode,
  {
    preloadedState,
    store = setupStore(preloadedState),
    router,
    path = '*',
    ...renderOptions
  }: RenderWithProvidersOptions = {}
) {
  function Wrapper({ children }: PropsWithChildren) {
    const renderRouter = () => {
      if (!router) return children;
      return (
        <RouterProvider
          router={createMemoryRouter([{ path, element: children }], router)}
        />
      );
    };

    return (
      <React.StrictMode>
        <Provider store={store}>
          <ThemeProvider>{renderRouter()}</ThemeProvider>
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
