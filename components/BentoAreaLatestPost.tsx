import type { Post } from "@/db/schema/post.ts";

import { makePostContentHtml, makeShortPostPreview } from "@/utils/blog.ts";

interface Props {
    posts: Post[];
}

export default function BentoAreaLatestPost(props: Props) {
    const latestPostContentHtml = makePostContentHtml(props.posts[0]);
    const recentPosts = props.posts.slice(1);

    return (
        <div class="latest-posts bento-item">
            <article
                class="post"
                dangerouslySetInnerHTML={{ __html: latestPostContentHtml }}
            >
            </article>
            {recentPosts.map((post) => (
                <section
                    class="post"
                    dangerouslySetInnerHTML={{
                        __html: makeShortPostPreview(post),
                    }}
                >
                </section>
            ))}
            <a href="/posts">See all posts</a>
        </div>
    );
}
