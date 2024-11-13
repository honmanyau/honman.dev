import { type Post } from "@/db/schema/post.ts";

export function makePostContentHtml(post: Post) {
    const { title, date, permalink } = post;
    const headingHtml = makeTitleHtml(permalink, title);
    const datetimeHtml = makeDatetimeHtml(date);

    return headingHtml + datetimeHtml + post.contentHtml;
}

export function makeShortPostPreview(
    post: Post,
    options: { includeDescription: boolean } = { includeDescription: false },
) {
    const { title, date, permalink } = post;
    const headingHtml = makeTitleHtml(permalink, title, {
        headingIsLink: true,
    });
    const datetimeHtml = makeDatetimeHtml(date);

    if (!options.includeDescription) return headingHtml + datetimeHtml;

    const descriptionHtml = `<p><i>${post.description}</i></p>`;

    return headingHtml + datetimeHtml + descriptionHtml;
}

function makeTitleHtml(
    permalink: string,
    title: string,
    options: { headingIsLink: boolean } = { headingIsLink: false },
) {
    const headingContent = options.headingIsLink
        ? `<a href="/posts/${permalink}">${title}</a>`
        : title;

    return `<h1>${headingContent}</h1>`;
}

function makeDatetimeHtml(date: string) {
    return `<div class="post-info"><time datetime=${
        new Date(date).toISOString().split("T")[0]
    }>${date}</time></div>`;
}
