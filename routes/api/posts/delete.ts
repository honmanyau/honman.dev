import { Handlers } from "$fresh/server.ts";

import { deletePost } from "@/db/repository/post.ts";
import { getRequiredFormValue } from "@/utils/form.ts";

export const handler: Handlers = {
    async POST(req, ctx) {
        const form = await req.formData();
        const permalink = getRequiredFormValue(form, "permalink");

        if (permalink === null) {
            throw new Deno.errors.NotFound();
        }

        await deletePost(permalink);

        const headers = new Headers({ "Location": "/shikwasa" });

        return new Response(null, { status: 303, headers });
    },
};
