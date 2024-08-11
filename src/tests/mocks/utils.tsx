'use client';

/* eslint-disable react-compiler/react-compiler */
/* eslint-disable import/no-extraneous-dependencies */
import { StoreProvider } from '@shared/store/StoreProvider';
import { ThemeProvider } from '@shared/themes';
import type { RenderOptions } from '@testing-library/react';
import { render } from '@testing-library/react';
import type { PropsWithChildren, ReactNode } from 'react';
import React from 'react';

export function renderWithProviders(
  ui: ReactNode,
  renderOptions: RenderOptions = {}
) {
  function Wrapper({ children }: PropsWithChildren) {
    return (
      <React.StrictMode>
        <ThemeProvider>
          <StoreProvider>{children}</StoreProvider>
        </ThemeProvider>
      </React.StrictMode>
    );
  }
  const rendered = render(ui, {
    wrapper: Wrapper,
    ...renderOptions,
  });

  return { ...rendered };
}
