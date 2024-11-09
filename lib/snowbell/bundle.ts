import { bundle } from "https://deno.land/x/emit/mod.ts";

(async function () {
    const url = new URL("./mod.ts", import.meta.url);
    const { code } = await bundle(url);

    Deno.writeFile("../../static/snowbell.js", new TextEncoder().encode(code));
})();
