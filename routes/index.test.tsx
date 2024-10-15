import { expect } from "jsr:@std/expect";

import { http } from "../utils/test.ts";

Deno.test("The home page", async (t) => {
    await t.step("", async () => {
        const resp = await http.get("/");

        expect(resp.status).toBe(200);
    });
});
