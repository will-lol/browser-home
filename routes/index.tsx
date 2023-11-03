import { PageProps } from "$fresh/server.ts";

export default function Home(props: PageProps) {
  const startFromParam: string | number | null = props.url.searchParams.get(
    "start",
  );
  const endFromParam: string | number | null = props.url.searchParams.get(
    "end",
  );
  let startParsed: number, endParsed: number;

  const currentYear = new Date().getFullYear();
  if (startFromParam && endFromParam) {
    startParsed = parseInt(startFromParam);
    endParsed = parseInt(endFromParam);
  } else {
    startParsed = Date.UTC(currentYear, 0, 1, 0, 0, 0, 0);
    endParsed = Date.UTC(currentYear + 1, 0, 0, 0, 0, 0, 0);
  }

  const currentTime = Date.now();
  const yearProgress = (currentTime - startParsed) / (endParsed - startParsed);
  const yearProgressPercentage = (yearProgress * 100).toPrecision(6);

  return (
    <main class="h-screen flex flex-col items-center justify-center">
      <div class="w-96 p-1 h-8 shadow border border-gray-300 dark:border-[#505057] border-solid rounded-full bg-gray-200 dark:bg-[#44434d]">
        <div class="flex relative items-start h-full rounded-full w-full">
          <div class="flex h-full w-full rounded-full overflow-hidden">
            <div
              class={`h-full origin-left shadow bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-400 dark:to-blue-500 w-full scale-x-[${yearProgress}]`}
            />
          </div>

          <div
            class={`shadow absolute bg-blue-500 rounded-full bottom-[200%] mt-3 w-fit translate-x-[-50%] z-0 left-[${yearProgressPercentage}%]`}
          >
            <h1 class="py-1 text-sm px-3 font-mono text-gray-100">
              {yearProgressPercentage}%
            </h1>
            <svg
              class="text-blue-500 absolute left-1/2 translate-x-[-50%] rotate-180 top-3/4"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
            >
              <path
                class="fill-current"
                stroke="none"
                fill="#20be86"
                d="M9.1339745962156 3.2057713659401a1 1 0 0 1 1.7320508075689 0l7.2679491924311 12.58845726812a1 1 0 0 1 -0.86602540378444 1.5l-14.535898384862 0a1 1 0 0 1 -0.86602540378444 -1.5"
              >
              </path>
            </svg>
          </div>
        </div>
      </div>
    </main>
  );
}
