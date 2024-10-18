import { sql } from "drizzle-orm";
import {
    check,
    pgEnum,
    pgTable,
    timestamp,
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

export const oauthProviderEnum = pgEnum(
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
    oauthProvider: oauthProviderEnum().notNull(),
    username: varchar({ length: 32 }).unique().notNull(),
    displayName: varchar({ length: 255 }),
    email: varchar({ length: 255 }).unique(),
}, (table) => ({
    checkConstraint: check(
        "username_check",
        sql`LENGTH(${table.username}) > 2 AND username ~ '^[a-z0-9][a-z0-9\-]*[a-z0-9]$'`,
    ),
}));

export const insertUserSchema = createInsertSchema(userTable, {
    username: z.string().min(2).max(36),
    email: z.string().email().optional(),
}).omit({
    id: true,
    created: true,
    updated: true,
});

export const selectUserSchema = createSelectSchema(userTable);
