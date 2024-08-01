/* eslint-disable import/no-extraneous-dependencies */
import { store } from '@shared/store';
import { ThemeProvider } from '@shared/themes';
import type { RenderOptions } from '@testing-library/react';
import { render } from '@testing-library/react';
import type { PropsWithChildren, ReactNode } from 'react';
import React from 'react';
import { Provider } from 'react-redux';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';

export function renderWithProviders(
  ui: ReactNode,
  renderOptions: RenderOptions = {}
) {
  function Wrapper({ children }: PropsWithChildren) {
    const rtr = createMemoryRouter([{ path: '/', element: children }]);

    return (
      <React.StrictMode>
        <Provider store={store}>
          <ThemeProvider>
            <RouterProvider router={rtr} />
          </ThemeProvider>
        </Provider>
      </React.StrictMode>
    );
  }
  const rendered = render(ui, {
    wrapper: Wrapper,
    ...renderOptions,
  });

  return rendered;
}
