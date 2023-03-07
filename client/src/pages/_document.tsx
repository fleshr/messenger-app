import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="leading-[1.2] text-zinc-900 antialiased dark:bg-gray-800 dark:text-gray-50">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
