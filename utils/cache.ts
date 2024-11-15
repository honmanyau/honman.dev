const CACHE_NAMESPACE = "honman.dev";

const cache = await caches.open(CACHE_NAMESPACE);

export async function get<T>(key: string): Promise<T | undefined> {
    const response = await cache.match(key);

    if (!response) return;

    const expires = response.headers.get("Expires");
    const expired = !!expires && new Date(expires) < new Date();

    if (expired) {
        await remove(key);

        return undefined;
    }

    return response?.json();
}

export async function put(key: string, value: unknown, ttl = 7 * 24 * 60 * 60) {
    const response = new Response(JSON.stringify(value), {
        headers: {
            "Expires": new Date(Date.now() + ttl * 1000).toUTCString(),
        },
    });

    await cache.put(key, response.clone());
}

export async function remove(key: string) {
    await cache.delete(key);
}

export const cacheKeys = {
    posts: { index: makeCacheKey("posts/index") },
};

function makeCacheKey(key: string) {
    return `https://honman.dev/cache/${key}`;
}
