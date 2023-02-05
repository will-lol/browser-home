import useAsset from "ultra/hooks/use-asset.js";
// Twind
import { tw } from "./twind/twind.ts";

export default function App() {
  const currentYear = new Date().getFullYear();
  const yearOffset = Date.UTC(currentYear,0,0,0,0,0,0);
  const endOfYear = Date.UTC(currentYear + 1,0,0,0,0,0,0);
  const currentTime = Date.now();
  const yearProgress = (currentTime - yearOffset) / (endOfYear - yearOffset);
  const yearProgressPercentage = Math.trunc(yearProgress * 1000000)/10000

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <title>Year Progress</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={tw(`bg-[#F9F9FB] dark:bg-[#2B2A33] `)}>
        <main className={tw(`h-screen flex flex-col items-center justify-center`)}>
          <div className={tw(`w-48 p-0.5 h-5 shadow border border-gray-300 border-solid rounded-full bg-gray-200 dark:bg-[#44434d]`)}>
            <div className={tw(`bg-blue-500 dark:bg-blue-400] h-full shadow rounded-full w-[${yearProgressPercentage.toString()}%]`)}/>
            <h1 className={tw(`mt-2 font-mono text-xs text-gray-400`)}>{yearProgressPercentage}%</h1>
          </div>
        </main>
      </body>
    </html>
  );
}
