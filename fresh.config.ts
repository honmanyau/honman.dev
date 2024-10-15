import { defineConfig } from "$fresh/server.ts";

import denoKvAuthPlugin from "./plugins/deno-kv-oauth.ts";

export default defineConfig({
    server: {
        // Server port affects OAuth in dev because it has to be specified
        // explicitly in OAuth provider app.
        port: Deno.env.get("SERVER_PORT"),
    },
    plugins: [
        denoKvAuthPlugin,
    ],
});
