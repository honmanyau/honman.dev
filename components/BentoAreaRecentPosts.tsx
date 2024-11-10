import type { Post } from "@/db/schema/post.ts";

import { makeShortPostPreview } from "@/utils/blog.ts";

interface Props {
    posts: Post[];
}

export default function BentoAreaRecentPosts(props: Props) {
    return (
        <div class="bento-area-recent-posts bento-item">
            {props.posts.map((post) => (
                <article
                    dangerouslySetInnerHTML={{
                        __html: makeShortPostPreview(post),
                    }}
                >
                </article>
            ))}
        </div>
    );
}
