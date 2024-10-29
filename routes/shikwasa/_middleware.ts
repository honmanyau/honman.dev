import { FreshContext } from "$fresh/server.ts";

import { gitHubHelpers } from "@/plugins/deno-kv-oauth.ts";

interface State {
	session: string | null;
}

export async function handler(
	req: Request,
	ctx: FreshContext<State>,
) {
	const sessionId = await gitHubHelpers.getSessionId(req);
	const authenticated = sessionId !== undefined;

	if (!authenticated) {
		return new Response("Unauthorized", { status: 401 });
	}

	ctx.state.session = sessionId;

	return await ctx.next();
}
