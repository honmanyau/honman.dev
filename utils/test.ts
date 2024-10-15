import { createHandler, ServeHandlerInfo } from "$fresh/server.ts";
import "$std/dotenv/load.ts";
import config from "../fresh.config.ts";
import manifest from "../fresh.gen.ts";

const TEST_SERVER_PORT = 4242;
const TEST_SERVER_HOSTNAME = "127.0.0.1";
const CONN_INFO: ServeHandlerInfo = {
    completed: Promise.resolve(),
    remoteAddr: {
        hostname: TEST_SERVER_HOSTNAME,
        port: TEST_SERVER_PORT,
        transport: "tcp",
    },
};

const handler = await createHandler(manifest, config);

export const http = {
    get: _get,
    put: _put,
    post: _post,
    delete: _delete,
};

/**
 * Handle a GET request.
 */
function _get(pathname: string, init?: Omit<RequestInit, "method">) {
    const endpoint = createEndpoint(pathname);
    const request = new Request(endpoint, { ...init, method: "GET" });

    return handler(request, CONN_INFO);
}

/**
 * Handle a POST request.
 */
function _post(pathname: string, init?: Omit<RequestInit, "method">) {
    const endpoint = createEndpoint(pathname);
    const request = new Request(endpoint, { ...init, method: "POST" });

    return handler(request, CONN_INFO);
}

/**
 * Handle a PUT request.
 */
function _put(pathname: string, init?: Omit<RequestInit, "method">) {
    const endpoint = createEndpoint(pathname);
    const request = new Request(endpoint, { ...init, method: "PUT" });

    return handler(request, CONN_INFO);
}

/**
 * Handle a DELETE request.
 */
function _delete(pathname: string, init?: Omit<RequestInit, "method">) {
    const endpoint = createEndpoint(pathname);
    const request = new Request(endpoint, { ...init, method: "DELETE" });

    return handler(request, CONN_INFO);
}

/**
 * Create an HTTP request endpoint for the given pathname.
 */
function createEndpoint(pathname: string) {
    if (!pathname.startsWith("/")) {
        throw new Error("Pathnames must begin with a leading slash");
    }

    return `http://${TEST_SERVER_HOSTNAME}${pathname}`;
}
