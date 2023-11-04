import { useEffect, useRef } from "preact/hooks";

interface BarProps {
  start: number;
  end: number;
}

export default function Bar(props: BarProps) {
  function getCurrentProgress(start: number, end: number): number {
    const currentTime = Date.now();
    return (currentTime - start) / (end - start);
  }

  const bar = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLDivElement>(null);
  const percentage = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    updater(1000, () => {
      if (bar.current && label.current && percentage.current) {
        const progress = getCurrentProgress(props.start, props.end);
        bar.current.style.scale = `${progress} 1`;
        label.current.style.left = `${(progress * 100).toPrecision(6)}%`;
        percentage.current.innerText = `${(progress * 100).toPrecision(6)}%`;
      }
    });  
  }, []);
  
  function updater(duration: number, fn: Function) {
    let controller = new AbortController();

    addEventListener("focus", () => {
      controller = new AbortController();
      update();
    })

    addEventListener("blur", () => controller.abort());
  
    update();

    function update() {
      if (controller.signal.aborted) {
        return;
      }

      fn();
      console.log("updated");

      setTimeout(update, duration)
    }
  }

  return (
    <div class="w-96 p-1 h-8 shadow border border-gray-300 dark:border-[#505057] border-solid rounded-full bg-gray-200 dark:bg-[#44434d]">
      <div class="flex relative items-start h-full rounded-full w-full">
        <div class="flex h-full w-full rounded-full overflow-hidden">
          <div ref={bar}
            style={`scale: ${getCurrentProgress(props.start, props.end)} 1`}
            class={`transition-all duration-1000 ease-linear h-full origin-left shadow bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-400 dark:to-blue-500 w-full`}
          />
        </div>

        <div
          ref={label}
          class={`transition-all duration-1000 ease-linear left-[${(getCurrentProgress(props.start, props.end) * 100).toPrecision(6) + "%"}] shadow absolute bg-blue-500 rounded-full bottom-[200%] mt-3 w-fit translate-x-[-50%] z-0`}
        >
          <h1 ref={percentage} class="py-1 text-sm px-3 font-mono text-gray-100">
            {(getCurrentProgress(props.start, props.end) * 100).toPrecision(6) + "%"}%
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
  );
}
