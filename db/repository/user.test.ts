import { expect } from "@std/expect/expect";
import { afterAll, describe, it } from "jsr:@std/testing/bdd";

import { db } from "@/db/drizzle.ts";
import {
    getUserById,
    getUserByOauthId,
    insertUser,
} from "@/db/repository/user.ts";
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
            const user = await insertUser(userData);

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
        it(`throws an InvalidData error if username contains fewer than ${MIN_USERNAME_LENGTH} characters`, () => {
            const userData = generateUserData({
                username: "a".repeat(MIN_USERNAME_LENGTH - 1),
            });

            expect(insertUser(userData)).rejects.toThrow(
                Deno.errors.InvalidData,
            );
        });

        it(`throws an InvalidData error if username contains more than ${MAX_USERNAME_LENGTH} characters`, () => {
            const userData = generateUserData({
                username: "a".repeat(MAX_USERNAME_LENGTH + 1),
            });

            expect(insertUser(userData)).rejects.toThrow(
                Deno.errors.InvalidData,
            );
        });

        it("throws an InvalidData error if username contains invalid characters", () => {
            const userData = generateUserData({ username: "aya-" });

            expect(insertUser(userData)).rejects.toThrow(
                Deno.errors.InvalidData,
            );
        });

        it("throws an InvalidData error if username begins with a hyphen", () => {
            const userData = generateUserData({ username: "-aya" });

            expect(insertUser(userData)).rejects.toThrow(
                Deno.errors.InvalidData,
            );
        });

        it("throws an InvalidData error if username ends with a hyphen", () => {
            const userData = generateUserData({ username: "aya-" });

            expect(insertUser(userData)).rejects.toThrow(
                Deno.errors.InvalidData,
            );
        });

        it("throws an InvalidData error if username ends with a hyphen", () => {
            const userData = generateUserData({ username: "aya-" });

            expect(insertUser(userData)).rejects.toThrow(
                Deno.errors.InvalidData,
            );
        });

        it("throws an InvalidData error if email is malformed", () => {
            const userData = generateUserData({ email: "aya@malformed" });

            expect(insertUser(userData)).rejects.toThrow();
        });

        it("throws an InvalidData error when inserting a user with the same OAuth ID and provider", async () => {
            const userData1 = generateUserData();
            const userData2 = generateUserData();

            userData2.oauthId = userData1.oauthId;
            userData2.oauthProvider = userData1.oauthProvider;

            await insertUser(userData1);

            expect(insertUser(userData2)).rejects.toThrow(
                Deno.errors.AlreadyExists,
            );
        });
    });

    describe("getUserById()", () => {
        it("returns a user with the given `id` if it exists", async () => {
            const userData = generateUserData();
            const { id } = await insertUser(userData);
            const user = await getUserById(id);

            expect(user.id).toBe(id);
            expect(user.created).toBeInstanceOf(Date);
            expect(user.updated).toBeInstanceOf(Date);
            expect(user.oauthId).toBe(userData.oauthId);
            expect(user.oauthProvider).toBe(userData.oauthProvider);
            expect(user.username).toBe(userData.username);
            expect(user.displayName).toBe(userData.displayName);
            expect(user.email).toBe(userData.email);
        });

        it("throws a NotFound error if the user does not exist", () => {
            const id = crypto.randomUUID();

            expect(getUserById(id)).rejects.toThrow(Deno.errors.NotFound);
        });
    });

    describe("getUserByOauthId()", () => {
        it("returns a user with the given `id` if it exists", async () => {
            const userData = generateUserData();
            const { id } = await insertUser(userData);
            const user = await getUserByOauthId(
                userData.oauthProvider,
                userData.oauthId,
            );

            expect(user.id).toBe(id);
            expect(user.created).toBeInstanceOf(Date);
            expect(user.updated).toBeInstanceOf(Date);
            expect(user.oauthId).toBe(userData.oauthId);
            expect(user.oauthProvider).toBe(userData.oauthProvider);
            expect(user.username).toBe(userData.username);
            expect(user.displayName).toBe(userData.displayName);
            expect(user.email).toBe(userData.email);
        });

        it("throws a NotFound error if the user does not exist", () => {
            const oauthId = String(Math.round(Math.random() * 1E9));

            expect(getUserByOauthId(
                OAuthProvider.GITHUB,
                oauthId,
            )).rejects.toThrow(Deno.errors.NotFound);
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
