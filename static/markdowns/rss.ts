import { Atom } from "@feed/feed";
import { toKebabCase } from "@std/text";

import { marked, sanitizeHtml } from "@/utils/input-processing.ts";
import { getFrontmatter, stripFrontmatter } from "./fix.ts";

(async function () {
    const files = [...Deno.readDirSync("./")].filter((file) =>
        file.name.endsWith(".md")
    );

    const sortedFrontmatter = files.map(({ name }) => {
        const text = Deno.readTextFileSync(`./${name}`);
        const frontmatter = getFrontmatter(text);

        if (frontmatter.date + ".md" !== name) {
            throw new Error("Date is not the same as the file name.");
        }

        return { ...frontmatter, filename: name } as any;
    }).sort((a, b) => b.date.localeCompare(a.date));

    // const rssFeed = new Rss({
    //     title: "honman.dev",
    //     description: "Honman's canvas and laboratory on the Internet.",
    //     link: "https://honman.dev/feed.xml",
    //     updated: new Date(),
    //     id: "https://honman.dev/feed.xml",
    //     authors: [],
    // });

    const atomFeed = new Atom({
        title: "honman.dev",
        description: "Honman's canvas and laboratory on the Internet.",
        link: "https://honman.dev/feed",
        authors: [
            {
                name: "Honman Yau",
                email: "not.delivered@honman.dev",
            },
        ],
        updated: new Date(),
        id: "https://honman.dev/feed",
    });

    const processed = sortedFrontmatter.slice(0, 7).map(async (frontmatter) => {
        const text = Deno.readTextFileSync(`./${frontmatter.filename}`);
        const contentMarkdown = stripFrontmatter(text);
        const unsanitizedContentHtml = await marked.parse(
            contentMarkdown,
        );
        const contentHtml = sanitizeHtml(unsanitizedContentHtml);
        const permalink = toKebabCase(frontmatter.title);

        console.log("AYA: contentHtml", contentHtml);

        // rssFeed.addItem({
        //     title: frontmatter.title,
        //     link: `https://honman.dev/posts/${permalink}`,
        //     id: `https://honman.dev/posts/${permalink}`,
        //     updated: new Date(frontmatter.date),
        //     description: frontmatter.description,
        //     content: {
        //         body: "",
        //         type: "html",
        //     },
        // });

        atomFeed.addItem({
            title: frontmatter.title,
            link: `https://honman.dev/posts/${permalink}`,
            id: `https://honman.dev/posts/${permalink}`,
            updated: new Date(frontmatter.date),
            summary: frontmatter.description,
            content: {
                body: contentHtml,
                type: "html",
            },
        });

        return Promise.resolve();
    });

    await Promise.all(processed);

    // Deno.writeTextFileSync("../feed.xml", rssFeed.build());
    Deno.writeTextFileSync("../feed.xml", atomFeed.build());
})();
