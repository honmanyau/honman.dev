import { sql } from "drizzle-orm";
import {
    check,
    pgEnum,
    pgTable,
    timestamp,
    unique,
    uuid,
    varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export type InsertUserSchema = z.infer<typeof insertUserSchema>;
export type SelectUserSchema = z.infer<typeof selectUserSchema>;

export enum OAuthProvider {
    GITHUB = "github",
}

export const MIN_USERNAME_LENGTH = 2;
export const MAX_USERNAME_LENGTH = 36;

export const oauthProviderPgEnum = pgEnum(
    "oauth_provider",
    Object.values(OAuthProvider) as [OAuthProvider, ...OAuthProvider[]],
);

export const userTable = pgTable("user", {
    id: uuid().defaultRandom().primaryKey(),
    created: timestamp().defaultNow().notNull(),
    updated: timestamp().defaultNow().notNull().$onUpdate(() =>
        sql`CURRENT_TIMESTAMP`
    ),
    oauthId: varchar({ length: 255 }).notNull(),
    oauthProvider: oauthProviderPgEnum().notNull(),
    username: varchar({ length: MAX_USERNAME_LENGTH }).unique().notNull(),
    displayName: varchar({ length: 255 }),
    email: varchar({ length: 255 }).unique(),
}, (table) => ({
    uniqueConstraint: unique("oauth_composite_key").on(
        table.oauthId,
        table.oauthProvider,
    ),
    checkConstraint: check(
        "username_check",
        sql`username ~ '^[a-z0-9][a-z0-9\-]*[a-z0-9]$'`,
    ),
}));

export const insertUserSchema = createInsertSchema(userTable, {
    username: z.string().min(MIN_USERNAME_LENGTH).max(MAX_USERNAME_LENGTH)
        .regex(
            /^[a-z0-9][a-z0-9\-]*[a-z0-9]$/,
        ),
    email: z.string().email().optional(),
}).omit({
    id: true,
    created: true,
    updated: true,
});

export const selectUserSchema = createSelectSchema(userTable);
