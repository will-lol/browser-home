import { css } from "@twind/core";
import { tw } from "./twind/twind.ts";

function sigFig(num: number, figs: number): string {
  const numStringArray= num.toString().split(".");
  const integers = Array.from(numStringArray[0]);
  let decimals: Array<string>;
  try {
      decimals = Array.from(numStringArray[1]);
  } catch {
      decimals = [];
  }
  let disparity = figs - (integers.length + decimals.length) //negative if there figs to remove, positive if there are figs to add

  if (disparity > 0) {
      while (disparity != 0) {
          decimals.push("0")
          disparity--
      }
  } else {
      while ((decimals.length > 0) && (disparity != 0)) {
          decimals.pop();
          disparity++;
      }

      if (disparity == 0) {
          return repairString(integers, decimals);
      } else {
          let position = integers.length - 1;
          while (disparity != 0) {
              integers[position] = "0";
              position--
              disparity++
          }
      }
  }

  return(repairString(integers, decimals))

  function repairString(integers: Array<string>, decimals: Array<string>): string {
      if (decimals.length > 0) {
          return integers.join("") + "." + decimals.join("");
      } else {
          return integers.join("")
      }
  }
}

export default function App() {
  const currentYear = new Date().getFullYear();
  const startOfYear = Date.UTC(currentYear,0,1,0,0,0,0);
  const endOfYear = Date.UTC(currentYear + 1,0,0,0,0,0,0);
  const currentTime = Date.now();
  const yearProgress = (currentTime - startOfYear) / (endOfYear - startOfYear);
  const yearProgressPercentage = sigFig(yearProgress * 100, 5);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <title>Year Progress</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={tw(`bg-[#F9F9FB] dark:bg-[#2B2A33] `)}>
        <main className={tw(`h-screen flex flex-col items-center justify-center`)}>
          <div className={tw(`w-96 p-1 h-8  shadow border border-gray-300 border-solid rounded-full bg-gray-200 dark:bg-[#44434d]`)}>
            <div className={tw(`flex items-start h-full overflow-clip rounded-full w-full`)}>
              <div className={tw(`h-full origin-left shadow bg-blue-500 dark:bg-blue-400 w-full scale-x-[${yearProgress}]`)}/>
            </div>
            <div className={tw(`relative border border-gray-200 border-solid mt-4 shadow rounded w-fit translate-x-[-50%] z-0 left-[${yearProgressPercentage}%] `)}>
              <h1 className={tw(`py-1 text-sm px-3 font-mono text-gray-400`)}>{yearProgressPercentage}%</h1>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
