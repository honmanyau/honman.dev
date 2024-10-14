import type { Plugin } from "$fresh/server.ts";
import { createGitHubOAuthConfig, createHelpers } from "jsr:@deno/kv-oauth";

const { signIn, handleCallback, signOut, getSessionId } = createHelpers(
    createGitHubOAuthConfig(),
);

export default {
    name: "kv-oauth",
    routes: [
        {
            path: "/sign-in-github",
            async handler(req) {
                return await signIn(req);
            },
        },
        {
            path: "/callback",
            async handler(req) {
                const { response } = await handleCallback(req);

                return response;
            },
        },
        {
            path: "/sign-out",
            async handler(req) {
                return await signOut(req);
            },
        },
        {
            path: "/protected",
            async handler(req) {
                return await getSessionId(req) === undefined
                    ? new Response("Unauthorized", { status: 401 })
                    : new Response("You are allowed");
            },
        },
    ],
} as Plugin;
