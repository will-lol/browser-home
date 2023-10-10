import { AppProps } from "$fresh/server.ts";

export default function App({ Component }: AppProps) {
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>browser-home</title>
      </head>
      <body class="bg-[#F9F9FB] dark:bg-[#2B2A33]">
        <Component />
      </body>
    </html>
  );
}
