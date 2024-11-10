import type { Post } from "@/db/schema/post.ts";

import { makePostContentHtml } from "@/utils/blog.ts";

interface Props {
    post: Post;
}

export default function BentoAreaLatestPost(props: Props) {
    const contentHtml = makePostContentHtml(props.post);

    return (
        <div class="bento-area-latest-post bento-item">
            <article
                dangerouslySetInnerHTML={{ __html: contentHtml }}
            >
            </article>
        </div>
    );
}
