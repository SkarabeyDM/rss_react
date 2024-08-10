import { Footer } from '@widgets/Footer';
import type { PropsWithChildren } from 'react';

export function MainLayout({ children }: PropsWithChildren) {
  return (
    <div className="app">
      <div className="wrapper">
        <main>{children}</main>
        <Footer />
      </div>
    </div>
  );
}
