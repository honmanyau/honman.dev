import type { RouteContext } from "$fresh/server.ts";
import { toKebabCase } from "@std/text";

import type { Post } from "@/db/schema/post.ts";
import { PostFormat } from "@/db/schema/post.ts";

export default async function Markdowns(_req: Request, _ctx: RouteContext) {
    const path = Deno.cwd() + "/static/markdowns";
    const files = await Deno.readDir(path);
    const data: Omit<Post, "contentHtml">[] = [];

    for await (const file of files) {
        const text = await Deno.readTextFile(`${path}/${file.name}`);
        const frontmatter = getFrontmatter(text);
        const contentMarkdown = stripFrontmatter(text);

        data.push({
            title: frontmatter.title,
            description: frontmatter.description,
            published: frontmatter.published,
            tags: [],
            genre: PostFormat.POST,
            permalink: toKebabCase(frontmatter.title),
            contentMarkdown,
        });
    }

    return <div>{JSON.stringify(data)}</div>;
}

function validateFrontmatter(lines: string[]) {
    const fileHasValidFrontmatterBoundaries = !!/^---$/.test(lines[0]) &&
        !!/^---$/.test(lines[5]) && !!/^[a-z]+\:/.test(lines[1]) &&
        !!/^[a-z]+\:/.test(lines[2]) && !!/^[a-z]+\:/.test(lines[3]) &&
        !!/^[a-z]+\:/.test(lines[4]);

    if (!fileHasValidFrontmatterBoundaries) {
        throw new Error(`Invalid frontmatter encountered!`);
    }
}

function getFrontmatter(text: string) {
    const lines = text.split("\n");

    validateFrontmatter(lines);

    const frontmatter: { [key: string]: string } = {};

    for (let i = 1; i < 5; i++) {
        const line = lines[i];
        const matched = line.match(/^([a-z]+)\: (.+)$/);

        if (!(matched && matched[1] && matched[2])) {
            throw new Error("Invalid frontmatter field found.");
        }

        if (matched[2].startsWith("'") || matched[2].endsWith("'")) {
            throw new Error(
                `Found single quote! ${matched[1]}, ${matched[2]}.`,
            );
        }

        frontmatter[matched[1]] = matched[2].replace(/^"/, "").replace(
            /"$/,
            "",
        ).replace(/^\\"/, '"').replace(/\\"$/, '"');
    }

    return frontmatter;
}

function stripFrontmatter(text: string) {
    const lines = text.split("\n");

    validateFrontmatter(lines);

    return lines.slice(6).join("\n");
}
