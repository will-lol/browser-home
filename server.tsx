import { serve } from "https://deno.land/std@0.164.0/http/server.ts";
import { type Context, createServer } from "ultra/server.ts";
import { App, props } from "./src/app.tsx";

// Twind
import { createHeadInsertionTransformStream } from "ultra/stream.ts";
import { stringify, tw } from "./src/twind/twind.ts";

const server = await createServer({
  importMapPath: import.meta.resolve("./importMap.json"),
  browserEntrypoint: import.meta.resolve("./client.tsx"),
});

function ServerApp({ context }: { context: Context }) {
  const requestUrl = new URL(context.req.url);
  let start: string | number | null = requestUrl.searchParams.get("start");
  let end: string | number | null = requestUrl.searchParams.get("end");

  if (start && end) {
    start = parseInt(start);
    end = parseInt(end);
  } else {
    start = null;
    end = null;
  }
  return <App startDate={start} endDate={end}/>;
}

server.use('*', async (c, next) => {
  c.res.headers.set("Content-Security-Policy", "frame-ancestors *");

  await next();
});

server.get("*", async (context) => {
  /**
   * Render the request
   */
  let result = await server.render(<ServerApp context={context} />, {
    disableHydration: true,
    generateStaticHTML: true
  });

  // Inject the style tag into the head of the streamed response
  const stylesInject = createHeadInsertionTransformStream(() => {
    if (Array.isArray(tw.target)) {
      return Promise.resolve(stringify(tw.target));
    }

    throw new Error("Expected tw.target to be an instance of an Array");
  });

  result = result.pipeThrough(stylesInject);

  return context.body(result, 200, {
    "content-type": "text/html; charset=utf-8",
  });
});
if (import.meta.main) {
  serve(server.fetch);
}
export default server;
