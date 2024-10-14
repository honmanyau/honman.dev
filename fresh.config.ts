import { defineConfig } from "$fresh/server.ts";

import denoKvAuthPlugin from "./plugins/deno-kv-oauth.ts";

export default defineConfig({
    plugins: [
        denoKvAuthPlugin,
    ],
});
