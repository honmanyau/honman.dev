import { and, eq } from "drizzle-orm";

import { db } from "@/db/drizzle.ts";
import {
    type InsertUserSchema,
    insertUserSchema,
    OAuthProvider,
    type UpdateUserSchema,
    userTable,
} from "@/db/schema/user.ts";
import {
    handlePostgresErrors,
    handleZodParsingErrors,
} from "@/utils/error-handling.ts";

/**
 * Insert a new user into the `user` table and return the inserted user.
 */
export async function insertUser(
    userData: InsertUserSchema,
) {
    userData.username = userData.username.toLowerCase();

    const value = handleZodParsingErrors(() =>
        insertUserSchema.parse(userData)
    );

    const users = await handlePostgresErrors(() =>
        db.insert(userTable).values(value).returning()
    );

    return users[0];
}

/**
 * Get a user by `id`.
 */
export async function getUserById(id: string) {
    const users = await handlePostgresErrors(() =>
        db.select().from(userTable).where(eq(userTable.id, id))
    );

    if (users.length === 0) {
        throw new Deno.errors.NotFound();
    }

    return users[0];
}

/**
 * Get a user by OAuth ID for a given OAuth provider.
 */
export async function getUserByOauthId(
    oauthProvider: OAuthProvider,
    oauthId: string,
) {
    const users = await handlePostgresErrors(() =>
        db.select().from(userTable).where(
            and(
                eq(userTable.oauthId, oauthId),
                eq(userTable.oauthProvider, oauthProvider),
            ),
        )
    );

    if (users.length === 0) {
        throw new Deno.errors.NotFound();
    }

    return users[0];
}

export async function updateUser(
    id: string,
    userData: Partial<UpdateUserSchema>,
) {
    const users = await handlePostgresErrors(() =>
        db.update(userTable).set(userData).where(eq(userTable.id, id))
            .returning()
    );

    if (users.length === 0) {
        throw new Deno.errors.NotFound();
    }

    return users[0];
}
