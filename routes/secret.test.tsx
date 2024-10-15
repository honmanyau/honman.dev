import { expect } from "jsr:@std/expect";
import { describe, it } from "jsr:@std/testing/bdd";

import { SIGN_IN_PAGE_PATHNAME } from "../utils/constants.ts";
import { http } from "../utils/test.ts";

describe("The `/secret` page", () => {
    describe("for an unauthenticated user", () => {
        it(
            "redirects an unauthenticated user to the `/sign-in` page",
            async () => {
                const resp = await http.get("/secret");
                const expectedPathname =
                    `/${SIGN_IN_PAGE_PATHNAME}?redirect=/secret`;

                expect(resp.status).toBe(302);
                expect(resp.headers.get("location")).toBe(expectedPathname);
            },
        );
    });
});
