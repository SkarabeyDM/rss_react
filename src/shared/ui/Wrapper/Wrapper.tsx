'use client';

import { ThemeContext } from '@shared/themes';
import classNames from 'classnames';
import type { PropsWithChildren } from 'react';
import { useContext } from 'react';

export function Wrapper({ children }: PropsWithChildren) {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={classNames('app', theme)}>
      <div className="wrapper">{children}</div>
    </div>
  );
}
