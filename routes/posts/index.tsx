import type { RouteContext } from "$fresh/server.ts";

import Metadata from "@/components/Metadata.tsx";
import { indexPosts } from "@/db/repository/post.ts";
import { makeShortPostPreview } from "@/utils/blog.ts";

export default async function Home(_req: Request, _ctx: RouteContext) {
    const posts = await indexPosts({ sort: "desc" });

    return (
        <>
            <Metadata
                title="All posts"
                description="All blog posts on honman.dev."
                ogType="website"
                url="https://honman.dev/posts"
            />
            <main class="latest-posts bento-item">
                {posts.map((post) => (
                    <div
                        class="post post-preview"
                        dangerouslySetInnerHTML={{
                            __html: makeShortPostPreview(post),
                        }}
                    >
                    </div>
                ))}
            </main>
        </>
    );
}
