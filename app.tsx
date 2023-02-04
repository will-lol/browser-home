/** @jsx h */
/// <reference no-default-lib="true"/>
/// <reference lib="dom" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />

import { h } from "nano_jsx";

export default function App() {
    const currentYear = new Date().getFullYear();
    const yearOffset = new Date(currentYear, 0, 0, 0, 0, 0, 0);
    const endOfYear = new Date(currentYear + 1, 0, 0, 0, 0, 0, 0);
    const currentTime = Date.now();
    const yearProgress = (currentTime - yearOffset.valueOf()) / (endOfYear.valueOf() - yearOffset.valueOf());
    console.log(yearProgress);
    
    return(
        <html>
            <body>
                
            </body>
        </html>
    )
}