import { ThemeProvider } from '@shared/themes';
// import { Wrapper } from '@shared/ui';
import { Footer } from '@widgets/Footer';
import { Header } from '@widgets/Header';
import type { AppProps } from 'next/app';
import '@app/App/ui/App.scss';
import dynamic from 'next/dynamic';

const Wrapper = dynamic(
  () => import('@shared/ui').then((module) => module.Wrapper),
  {
    ssr: false,
  }
);

export function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <Wrapper>
        <Header />
        <main>
          <Component {...pageProps} />
        </main>
        <Footer />
      </Wrapper>
    </ThemeProvider>
  );
}
