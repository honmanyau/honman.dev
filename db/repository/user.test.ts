import { expect } from "@std/expect/expect";
import { afterAll, describe, it } from "jsr:@std/testing/bdd";

import { db } from "@/db/drizzle.ts";
import { insertUser } from "@/db/repository/user.ts";
import {
    type InsertUserSchema,
    MAX_USERNAME_LENGTH,
    MIN_USERNAME_LENGTH,
    OAuthProvider,
} from "@/db/schema/user.ts";

afterAll(async () => {
    await db.$client.end();
});

describe("User repository", () => {
    describe("insertUser()", () => {
        it("inserts well-formed user data correctly", async () => {
            const userData = generateUserData();

            const result = await insertUser(userData);
            const user = result[0];

            expect(result).toHaveLength(1);
            expect(user.id).toBeDefined();
            expect(user.created).toBeInstanceOf(Date);
            expect(user.created).toEqual(user.updated);
            expect(user.oauthId).toBe(userData.oauthId);
            expect(user.oauthProvider).toBe(userData.oauthProvider);
            expect(user.username).toBe(userData.username);
            expect(user.displayName).toBe(userData.displayName);
            expect(user.email).toBe(userData.email);
        });

        // TODO|Honman Yau|2024-10-19
        // Set up error map for `ZodError`s.
        it(`throws an error if username contains fewer than ${MIN_USERNAME_LENGTH} characters`, () => {
            const userData = generateUserData({
                username: "a".repeat(MIN_USERNAME_LENGTH - 1),
            });

            expect(insertUser(userData)).rejects.toThrow();
        });

        it(`throws an error if username contains more than ${MAX_USERNAME_LENGTH} characters`, () => {
            const userData = generateUserData({
                username: "a".repeat(MAX_USERNAME_LENGTH + 1),
            });

            expect(insertUser(userData)).rejects.toThrow();
        });

        it("throws an error if username contains invalid characters", () => {
            const userData = generateUserData({ username: "aya-" });

            expect(insertUser(userData)).rejects.toThrow();
        });

        it("throws an error if username begins with a hyphen", () => {
            const userData = generateUserData({ username: "-aya" });

            expect(insertUser(userData)).rejects.toThrow();
        });

        it("throws an error if username ends with a hyphen", () => {
            const userData = generateUserData({ username: "aya-" });

            expect(insertUser(userData)).rejects.toThrow();
        });

        it("throws an error if username ends with a hyphen", () => {
            const userData = generateUserData({ username: "aya-" });

            expect(insertUser(userData)).rejects.toThrow();
        });

        it("throws an error if email is malformed", () => {
            const userData = generateUserData({ email: "aya@malformed" });

            expect(insertUser(userData)).rejects.toThrow();
        });

        it("throws an error when inserting a user with the same OAuth ID and provider", async () => {
            const userData1 = generateUserData();
            const userData2 = generateUserData();

            userData2.oauthId = userData1.oauthId;
            userData2.oauthProvider = userData1.oauthProvider;

            await insertUser(userData1);

            expect(insertUser(userData2)).rejects.toThrow(
                'duplicate key value violates unique constraint "oauth_composite_key"',
            );
        });
    });
});

function generateUserData(
    overrides: Partial<InsertUserSchema> = {},
): InsertUserSchema {
    const username = crypto.randomUUID();

    return {
        oauthId: Math.ceil(Math.random() * 1E9).toString(),
        oauthProvider: OAuthProvider.GITHUB,
        username: username,
        displayName: `Aya the Narwhal ${username}`,
        email: `${username}@unscalable.com.au`,
        ...overrides,
    };
}