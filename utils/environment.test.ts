import { expect } from "jsr:@std/expect";
import { describe, it } from "jsr:@std/testing/bdd";

import { getEnvironmentVariable } from "./environment.ts";

describe("getEnvironmentVariable()", () => {
    const key = crypto.randomUUID();
    const value = crypto.randomUUID();

    it("throws an error if the environment variable is not set", () => {
        expect(() => getEnvironmentVariable(key)).toThrow();
    });

    it("returns a value for the given key when it is set", () => {
        Deno.env.set(key, value);

        expect(getEnvironmentVariable(key)).toBe(value);
    });
});
