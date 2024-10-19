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

    const value = insertUserSchema.parse(userData);
    const user = await db.insert(userTable).values(value).returning();

    return user;
}
