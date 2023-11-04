import { PageProps } from "$fresh/server.ts";
import Bar from "../islands/Bar.tsx";

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
  
  return (
    <main class="h-screen flex flex-col items-center justify-center">
      <Bar start={startParsed} end={endParsed} />
    </main>
  );
}
