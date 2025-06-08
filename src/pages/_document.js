import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <title>TakonAI</title>
        <link rel="icon" href="/favicon/icon.png" />
      </Head>
      <body className="antialiased bg-background">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
