/* eslint-disable import/no-extraneous-dependencies */
import { store } from '@shared/store';
import type { RenderOptions } from '@testing-library/react';
import { render } from '@testing-library/react';
import type { PropsWithChildren, ReactNode } from 'react';
import React from 'react';
import { Provider } from 'react-redux';

export function renderWithProviders(
  ui: ReactNode,
  renderOptions: RenderOptions = {}
) {
  function Wrapper({ children }: PropsWithChildren) {
    return (
      <React.StrictMode>
        <Provider store={store}>{children}</Provider>
      </React.StrictMode>
    );
  }
  const rendered = render(ui, {
    wrapper: Wrapper,
    ...renderOptions,
  });

  return rendered;
}
