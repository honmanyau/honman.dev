import { type Post } from "@/db/schema/post.ts";

export function makePostContentHtml(post: Post) {
    const { title, date, permalink } = post;
    const headingHtml = `<h2><a href="/posts/${permalink}">${title}</a></h2>`;
    const datetimeHtml = `<div class="post-info"><time datetime=${
        new Date().toISOString().split("T")[0]
    }>${date}</time></div>`;

    return headingHtml + datetimeHtml + post.contentHtml;
}

export function makeShortPostPreview(
    post: Post,
    options: { includeDescription: boolean } = { includeDescription: false },
) {
    const { title, date, permalink } = post;
    const headingHtml = `<h2><a href="/posts/${permalink}">${title}</a></h2>`;
    const datetimeHtml = `<div class="post-info"><time datetime=${
        new Date().toISOString().split("T")[0]
    }>${date}</time></div>`;

    if (!options.includeDescription) return headingHtml + datetimeHtml;

    const descriptionHtml = `<p><i>${post.description}</i></p>`;

    return headingHtml + datetimeHtml + descriptionHtml;
}
