import{jsx as t}from"react/jsx-runtime";import{serve as r}from"https://deno.land/std@0.164.0/http/server.ts";import{createServer as e}from"ultra/server.ts";import o from"./src/app.tsx";import{createHeadInsertionTransformStream as a}from"ultra/stream.ts";import{stringify as i,tw as n}from"./src/twind/twind.ts";let s=await e({importMapPath:import.meta.resolve("./importMap.json"),browserEntrypoint:import.meta.resolve("./client.tsx")});function m({context:r}){return new URL(r.req.url),t(o,{})}s.get("*",async r=>{let e=await s.render(t(m,{context:r}),{disableHydration:!0,generateStaticHTML:!0}),o=a(()=>{if(Array.isArray(n.target))return Promise.resolve(i(n.target));throw Error("Expected tw.target to be an instance of an Array")});return e=e.pipeThrough(o),r.body(e,200,{"content-type":"text/html; charset=utf-8"})}),import.meta.main&&r(s.fetch);export default s;