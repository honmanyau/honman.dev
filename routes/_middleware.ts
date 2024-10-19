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

    if (sessionId) ctx.state.session = sessionId;

    return await ctx.next();
}
