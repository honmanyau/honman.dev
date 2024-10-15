import {
    SIGN_IN_PAGE_PATHNAME,
    SIGN_IN_PAGE_REDIRECT_PARAM_KEY,
} from "./constants.ts";

/**
 * Create a response that redirects a user to the sign-in page, and attaches
 * the pathname of the requested protected page as a query parameter for the
 * key `redirect`.
 */
export function createSignInRedirectResponse(url: URL): Response {
    const encodedPathname = `/${SIGN_IN_PAGE_PATHNAME}` === url.pathname
        ? "/"
        : encodeURIComponent(url.pathname);

    return new Response(null, {
        status: 302,
        headers: {
            Location:
                `/${SIGN_IN_PAGE_PATHNAME}?${SIGN_IN_PAGE_REDIRECT_PARAM_KEY}=${encodedPathname}`,
        },
    });
}
