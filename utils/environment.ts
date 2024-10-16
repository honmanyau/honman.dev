import "$std/dotenv/load.ts";

/**
 * Get environment variable safely by throwing an error if not found.
 */
export function getEnvironmentVariable(key: string): string {
    const value = Deno.env.get(key);

    if (value === undefined) {
        throw new Error("No database URL environment variable found!");
    }

    return value;
}
