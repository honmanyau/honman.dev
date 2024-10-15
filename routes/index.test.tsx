import { expect } from "jsr:@std/expect";
import { describe, it } from "jsr:@std/testing/bdd";

import { http } from "../utils/test.ts";

describe("The home page", () => {
    it("renders properly", async () => {
        const resp = await http.get("/");

        expect(resp.status).toBe(200);
    });
});
