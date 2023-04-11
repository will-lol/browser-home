import { tw } from "./twind/twind.ts";

export type props = {
  startDate: number | null;
  endDate: number | null;
};

export function App(props: props) {
  let start: number, end: number;

  const currentYear = new Date().getFullYear();
  if (
    props.startDate != null &&
    props.endDate != null &&
    props.startDate < Date.now() &&
    props.endDate > Date.now()
  ) {
    start = props.startDate;
    end = props.endDate;
  } else {
    start = Date.UTC(currentYear, 0, 1, 0, 0, 0, 0);
    end = Date.UTC(currentYear + 1, 0, 0, 0, 0, 0, 0);
  }
  const currentTime = Date.now();
  const yearProgress = (currentTime - start) / (end - start);
  const yearProgressPercentage = (yearProgress * 100).toPrecision(6);
  
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <title>Year Progress</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={tw(`bg-[#F9F9FB] dark:bg-[#2B2A33] `)}>
        <main
          className={tw(`h-screen flex flex-col items-center justify-center`)}
        >
          <div
            className={tw(
              `w-96 p-1 h-8 relative shadow border border-gray-300 dark:border-[#505057] border-solid rounded-full bg-gray-200 dark:bg-[#44434d]`
            )}
          >
            <div
              className={tw(
                `flex items-start h-full overflow-clip rounded-full w-full`
              )}
            >
              <div
                className={tw(
                  `h-full origin-left shadow bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-400 dark:to-blue-500 w-full scale-x-[${yearProgress}]`
                )}
              />
            </div>
            <div
              className={tw(
                `shadow absolute bg-blue-500 rounded-full bottom-[170%] mt-3 w-fit translate-x-[-50%] z-0 left-[${yearProgressPercentage}%] `
              )}
            >
              <h1 className={tw(`py-1 text-sm px-3 font-mono text-gray-100`)}>
                {yearProgressPercentage}%
              </h1>
              <svg
                className={tw(
                  `text-blue-500 absolute left-1/2 translate-x-[-50%] rotate-180 top-3/4`
                )}
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
              >
                <path
                  className={tw(`fill-current`)}
                  stroke="none"
                  fill="#20be86"
                  d="M9.1339745962156 3.2057713659401a1 1 0 0 1 1.7320508075689 0l7.2679491924311 12.58845726812a1 1 0 0 1 -0.86602540378444 1.5l-14.535898384862 0a1 1 0 0 1 -0.86602540378444 -1.5"
                ></path>
              </svg>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
