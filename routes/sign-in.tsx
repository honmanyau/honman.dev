import type { RouteContext } from "$fresh/server.ts";
import { basename } from "$std/path/basename.ts";

import { SIGN_IN_PAGE_PATHNAME } from "../lib/constants.ts";

validatePathname();

export default async function SignIn(req: Request, ctx: RouteContext) {
    const successUrl = new URL(req.url).searchParams.get("redirect");
    const href = successUrl
        ? `/sign-in-github?success_url=${successUrl}`
        : `/sign-in-github`;

    return <a href={href}>Sign in</a>;
}

/**
 * Ensure that the sign in page is correctly named because some pages depend
 * on its pathname.
 */
export function validatePathname(): void {
    const { filename } = import.meta;

    if (!filename || (basename(filename) !== SIGN_IN_PAGE_PATHNAME + ".tsx")) {
        throw new Error("Unexpected filename found for the sign in page!");
    }
}
