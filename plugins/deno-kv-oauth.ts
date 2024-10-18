import type { Plugin } from "$fresh/server.ts";
import { createGitHubOAuthConfig, createHelpers } from "jsr:@deno/kv-oauth";

import { insertUser } from "@/db/repository/user.ts";
import { getOauthUser } from "@/utils/user.ts";

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
                const payload = await gitHubHelpers.handleCallback(req);

                const { id, username, name, email, provider } =
                    await getOauthUser(
                        payload.tokens.accessToken,
                    );

                await insertUser({
                    oauthId: String(id),
                    oauthProvider: provider,
                    username,
                    displayName: name ? name : username,
                    email: email ? email : undefined,
                });

                return payload.response;
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
