import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html suppressHydrationWarning>
      <Head>
        <title>Star Wars Characters</title>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
