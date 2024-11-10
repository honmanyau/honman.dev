import type { RouteContext } from "$fresh/server.ts";

import { indexPosts } from "@/db/repository/post.ts";
import { makeShortPostPreview } from "@/utils/blog.ts";

export default async function Home(_req: Request, _ctx: RouteContext) {
    const posts = await indexPosts({ sort: "desc" });

    return (
        <main class="latest-posts bento-item">
            {posts.map((post) => (
                <section
                    dangerouslySetInnerHTML={{
                        __html: makeShortPostPreview(post),
                    }}
                >
                </section>
            ))}
        </main>
    );
}
