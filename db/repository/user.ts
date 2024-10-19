import { eq } from "drizzle-orm";
import { ZodError } from "npm:zod";

import { db } from "@/db/drizzle.ts";
import {
    type InsertUserSchema,
    insertUserSchema,
    userTable,
} from "@/db/schema/user.ts";

/**
 * Insert a new user into the `user` table and return the inserted user.
 */
export async function insertUser(
    userData: InsertUserSchema,
) {
    userData.username = userData.username.toLowerCase();

    let value: InsertUserSchema;

    try {
        value = insertUserSchema.parse(userData);
    } catch (error) {
        if (error instanceof ZodError) {
            throw new Deno.errors.InvalidData();
        }

        throw error;
    }

    const user = await db.insert(userTable).values(value).returning();

    return user;
}

/**
 * Get a user by `id`.
 */
export async function getUserById(id: string) {
    return db.select().from(userTable).where(eq(userTable.id, id));
}
