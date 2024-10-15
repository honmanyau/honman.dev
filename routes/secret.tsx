import type { RouteContext } from "$fresh/server.ts";

import { isAuthenticated } from "../lib/authentication.ts";
import { createSignInRedirectResponse } from "../lib/redirect.ts";

export default async function Secret(req: Request, ctx: RouteContext) {
    const userIsAuthenticated = isAuthenticated(ctx);

    if (!userIsAuthenticated) {
        return createSignInRedirectResponse(new URL(req.url));
    }

    return <div>Secret</div>;
}
