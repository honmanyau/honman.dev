import { ZodError } from "npm:zod";

// Postgres error codes. Reference:
// https://www.postgresql.org/docs/current/errcodes-appendix.html.
const POSTGRES_UNIQUE_VIOLATION_CODE = "23505";

/**
 * Wrapper that raises Deno.errors.InvalidData instead of ZodErrors.
 */
export function handleZodParsingErrors<T>(fn: () => T): T {
    try {
        return fn();
    } catch (error) {
        if (error instanceof ZodError) {
            throw new Deno.errors.InvalidData();
        }

        throw error;
    }
}

/**
 * Handle Postgres errors and throw an appropriate Deno error instead.
 */
export async function handlePostgresErrors<T>(
    fn: () => Promise<T>,
): Promise<T> {
    try {
        return await fn();
    } catch (error) {
        const handleProgressError = (error as any).name === "PostgresError";

        if (handleProgressError) {
            const postgresError = error as any;

            switch (postgresError.code) {
                case POSTGRES_UNIQUE_VIOLATION_CODE:
                    throw new Deno.errors.AlreadyExists();
                default:
                    throw new Error("Unhandled Postgres error");
            }
        }

        throw error;
    }
}
