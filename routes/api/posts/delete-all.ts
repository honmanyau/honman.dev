import { Handlers } from "$fresh/server.ts";

import { deletePost, indexPosts } from "@/db/repository/post.ts";

export const handler: Handlers = {
    async POST(_req, _ctx) {
        const posts = await indexPosts({ sort: "desc" });

        posts.map(async (post) => await deletePost(post.permalink));

        const headers = new Headers({ "Location": "/shikwasa" });

        return new Response(null, { status: 303, headers });
    },
};
