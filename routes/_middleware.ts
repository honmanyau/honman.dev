import { FreshContext } from "$fresh/server.ts";
import { createGitHubOAuthConfig, createHelpers } from "jsr:@deno/kv-oauth";

interface State {
    session: string | null;
}

const { getSessionId } = createHelpers(
    createGitHubOAuthConfig(),
);

export async function handler(
    req: Request,
    ctx: FreshContext<State>,
) {
    const sessionId = await getSessionId(req);

    if (sessionId) ctx.state.session = sessionId;

    return await ctx.next();
}
