import { ThemeProvider } from '@shared/themes';
import { Footer } from '@widgets/Footer';
import { Header } from '@widgets/Header';
import type { AppProps } from 'next/app';
import '@app/App/ui/App.scss';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { StoreProvider } from '@shared/store/StoreProvider';

const Wrapper = dynamic(
  () => import('@shared/ui').then((module) => module.Wrapper),
  {
    ssr: false,
  }
);

export function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Star Wars Characters</title>
      </Head>
      <ThemeProvider>
        <StoreProvider>
          <Wrapper>
            <Header />
            <main>
              <Component {...pageProps} />
            </main>
            <Footer />
          </Wrapper>
        </StoreProvider>
      </ThemeProvider>
    </>
  );
}
