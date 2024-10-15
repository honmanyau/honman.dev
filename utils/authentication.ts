import type { RouteContext } from "$fresh/server.ts";

/**
 * Determine whether or not a user is authenticated based on
 * {@link RouteContext}.
 */
export function isAuthenticated(ctx: RouteContext): boolean {
    const hasSession = !!(ctx.state.session ?? false);

    if (hasSession && !ctx.state.session) {
        throw new Error(
            `Unexpected falsy session value found (${ctx.state.session})!`,
        );
    }

    return !!ctx.state.session;
}
