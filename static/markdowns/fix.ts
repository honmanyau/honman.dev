import { type Post } from "@/db/schema/post.ts";

const path = "./";
const files = await Deno.readDir(path);
const data: Omit<Post, "contentHtml">[] = [];

for await (const file of files) {
    if (!file.name.endsWith(".md")) continue;

    const text = await Deno.readTextFile(`${path}/${file.name}`);
    const lines = text.split("\n");

    validateFrontmatter(lines);

    for (let i = 1; i < 5; i++) {
        const existingLine = lines[i];

        if (existingLine.startsWith("title: '") && existingLine.endsWith("'")) {
            lines[i] = existingLine.replace(/^title: \'/, 'title: "').replace(
                /\'$/,
                '"',
            );
        } else if (
            existingLine.startsWith("published: '") &&
            existingLine.endsWith("'")
        ) {
            lines[i] = existingLine.replace(/^published: \'/, 'published: "')
                .replace(
                    /\'$/,
                    '"',
                );
        } else if (
            existingLine.startsWith("description: '") &&
            existingLine.endsWith("'")
        ) {
            lines[i] = existingLine.replace(
                /^description: \'/,
                'description: "',
            )
                .replace(/\'$/, '"');
        } else if (
            existingLine.startsWith("status: '") && existingLine.endsWith("'")
        ) {
            lines[i] = existingLine.replace(/^status: \'/, 'status: "').replace(
                /\'$/,
                '"',
            );
        }

        if (
            lines[i].startsWith('published: "')
        ) {
            lines[i] = existingLine.replace(/^published: /, "date: ");
        }

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

        if (
            matched[2].startsWith('""') ||
            (matched[2].endsWith('""') && !(matched[2].endsWith('\\""')))
        ) {
            throw new Error(
                `Found double double quote! ${matched[1]}, ${matched[2]}.`,
            );
        }

        Deno.writeTextFileSync(`${path}/${file.name}`, lines.join("\n"));
    }
}

export function validateFrontmatter(lines: string[]) {
    const fileHasValidFrontmatterBoundaries = !!/^---$/.test(lines[0]) &&
        !!/^---$/.test(lines[5]) && !!/^[a-z]+\:/.test(lines[1]) &&
        !!/^[a-z]+\:/.test(lines[2]) && !!/^[a-z]+\:/.test(lines[3]) &&
        !!/^[a-z]+\:/.test(lines[4]);

    if (!fileHasValidFrontmatterBoundaries) {
        throw new Error(`Invalid frontmatter encountered!`);
    }
}

export function getFrontmatter(text: string) {
    const lines = text.split("\n");

    validateFrontmatter(lines);

    const frontmatter: { [key: string]: string } = {};

    for (let i = 1; i < 5; i++) {
        const line = lines[i].replace("title: '", 'title: "').replace(
            "published: '",
            'published: "',
        ).replace("description: '", 'description: "').replace(
            "status: '",
            'status: "',
        )
            .replace(/\'$/, '"');
        const matched = line.match(/^([a-z]+)\: (.+)$/);

        if (!(matched && matched[1] && matched[2])) {
            throw new Error("Invalid frontmatter field found.");
        }

        if (matched[2].startsWith("'") || matched[2].endsWith("'")) {
            console.log("AYA: line", line);
            console.log(
                "AYA: replaced",
                line[0],
                line.startsWith("'"),
                line.replace(/^\'/, '"').replace(/\'$/, '"'),
            );

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

export function stripFrontmatter(text: string) {
    const lines = text.split("\n");

    validateFrontmatter(lines);

    return lines.slice(6).join("\n");
}
