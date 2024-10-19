import { eq } from "drizzle-orm";

import { db } from "@/db/drizzle.ts";
import {
    type InsertUserSchema,
    insertUserSchema,
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

    const user = await handlePostgresErrors(() =>
        db.insert(userTable).values(value).returning()
    );

    return user[0];
}

/**
 * Get a user by `id`.
 */
export async function getUserById(id: string) {
    return db.select().from(userTable).where(eq(userTable.id, id));
}
