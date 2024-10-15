import type { Plugin } from "$fresh/server.ts";
import { createGitHubOAuthConfig, createHelpers } from "jsr:@deno/kv-oauth";

export const gitHubHelpers = createHelpers(createGitHubOAuthConfig());

export default {
    name: "kv-oauth",
    routes: [
        {
            path: "/sign-in-github",
            async handler(req) {
                return await gitHubHelpers.signIn(req);
            },
        },
        {
            path: "/callback",
            async handler(req) {
                const x = await gitHubHelpers.handleCallback(req);

                return x.response;
            },
        },
        {
            path: "/sign-out",
            async handler(req) {
                return await gitHubHelpers.signOut(req);
            },
        },
        {
            path: "/protected",
            async handler(req) {
                return await gitHubHelpers.getSessionId(req) === undefined
                    ? new Response("Unauthorized", { status: 401 })
                    : new Response("You are allowed");
            },
        },
    ],
} as Plugin;
