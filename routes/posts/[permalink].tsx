import type { RouteContext } from "$fresh/server.ts";

import { getPost } from "@/db/repository/post.ts";
import { makePostContentHtml } from "@/utils/blog.ts";

export default async function BlogPost(_req: Request, ctx: RouteContext) {
    const post = await getPost(ctx.params.permalink);

    return (
        <main
            class="bento-item post"
            dangerouslySetInnerHTML={{ __html: makePostContentHtml(post) }}
        >
        </main>
    );
}
