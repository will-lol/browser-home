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
          <div className={tw(`w-48 p-0.5 h-5 shadow border border-gray-300 border-solid rounded-full bg-gray-200 dark:bg-[#44434d]`)}>
            <div className={tw(`bg-blue-500 dark:bg-blue-400] h-full shadow rounded-full w-[${yearProgressPercentage.toString()}%]`)}/>
            <h1 className={tw(`mt-2 font-mono text-xs text-gray-400`)}>{yearProgressPercentage}%</h1>
          </div>
        </main>
      </body>
    </html>
  );
}
