import type { Plugin } from "$fresh/server.ts";
import { createGitHubOAuthConfig, createHelpers } from "jsr:@deno/kv-oauth";

import { getGitHubOauthUser } from "@/utils/user.ts";

export const gitHubHelpers = createHelpers(createGitHubOAuthConfig());

export default {
	name: "kv-oauth",
	routes: [
		{
			path: "/shiisa",
			async handler(req) {
				return await gitHubHelpers.signIn(req);
			},
		},
		{
			path: "/callback",
			async handler(req) {
				const payload = await gitHubHelpers.handleCallback(req);

				const { id, username } = await getGitHubOauthUser(
					payload.tokens.accessToken,
				);

				console.log("AYA: id", id, username);

				if (!(String(id) === "22585758" && username === "honmanyau")) {
					return new Response("Unauthorized", { status: 401 });
				}

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
