import type { RouteContext } from "$fresh/server.ts";

import Metadata from "@/components/Metadata.tsx";
import { getPost } from "@/db/repository/post.ts";
import { makePostContentHtml } from "@/utils/blog.ts";

export default async function BlogPost(_req: Request, ctx: RouteContext) {
    const post = await getPost(ctx.params.permalink);

    return (
        <>
            <Metadata
                title={post.title}
                description={post.description}
                ogType="article"
                url={`https://honman.dev/posts/${post.permalink}`}
            />
            <main
                class="bento-item post"
                dangerouslySetInnerHTML={{ __html: makePostContentHtml(post) }}
            >
            </main>
        </>
    );
}
