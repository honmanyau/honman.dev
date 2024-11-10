import type { Post } from "@/db/schema/post.ts";

interface Props {
    post: Post;
}

export default function BentoAreaLatestPost(props: Props) {
    const { title, date } = props.post;
    const contentHtml =
        `<h2>${title}</h2><div class="post-info"><time datetime=${
            new Date().toISOString().split("T")[0]
        }>${date}</time></div>` +
        props.post.contentHtml;

    return (
        <div class="bento-area-latest-post bento-item">
            <article
                dangerouslySetInnerHTML={{ __html: contentHtml }}
            >
            </article>
        </div>
    );
}
