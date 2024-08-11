import { ThemeProvider } from '@shared/themes';
import { Footer } from '@widgets/Footer';
import { Header } from '@widgets/Header';
import '@app/App/ui/App.scss';
import dynamic from 'next/dynamic';
import { StoreProvider } from '@shared/store/StoreProvider';
import type { PropsWithChildren } from 'react';

const Wrapper = dynamic(
  () => import('@shared/ui').then((module) => module.Wrapper),
  {
    ssr: false,
  }
);

export function App({ children }: PropsWithChildren) {
  return (
    <ThemeProvider>
      <StoreProvider>
        <Wrapper>
          <Header />
          {children}
          <Footer />
        </Wrapper>
      </StoreProvider>
    </ThemeProvider>
  );
}
