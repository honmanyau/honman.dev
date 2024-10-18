import type { FreshContext } from "$fresh/server.ts";

import { isAuthenticated } from "@/utils/authentication.ts";
import { createSignInRedirectResponse } from "@/utils/redirect.ts";

export default async function Secret(req: Request, ctx: FreshContext) {
    const userIsAuthenticated = isAuthenticated(ctx);

    if (!userIsAuthenticated) {
        return createSignInRedirectResponse(new URL(req.url));
    }

    return <div>Secret</div>;
}
