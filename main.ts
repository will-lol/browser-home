import { parse } from "std";
import { renderSSR } from "nano_jsx";
import App from "./app.tsx";

export function add(a: number, b: number): number {
  return a + b;
}

// Learn more at https://deno.land/manual/examples/module_metadata#concepts
if (import.meta.main) {
  console.log("Add 2 + 3 =", add(2, 3));
}

function handler(_req: Request) {
  const html = renderSSR(App);
  return new Response(html, {
    headers: {
      "content-type": "text/html",
    },
  });
}

const ac = new AbortController();
const args = parse(Deno.args);
Deno.serve({ signal: ac.signal, port: args.port }, handler);

globalThis.addEventListener("unload", () => {
  ac.abort()
});