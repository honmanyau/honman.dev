import type { RouteContext } from "$fresh/server.ts";

const kv = await Deno.openKv(":memory:");

interface User {
	id: string;
	username: string;
}

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

/**
 * Remember non-sensitive user data for a given session.
 */
export async function setUserWithSession(user: User, session: string) {
	await kv.set(["users_by_session", session], user, {
		expireIn: 240 * 60 * 1000,
	});
}

/**
 * Remove user data associated with a given session.
 */
export async function deleteSession(session: string) {
	await kv.delete(["users_by_session", session]);
}
