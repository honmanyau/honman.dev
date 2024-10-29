import { Handlers, type RouteContext } from "$fresh/server.ts";

import { getPost, updatePost } from "@/db/repository/post.ts";
import type { Post, PostFormat } from "@/db/schema/post.ts";

export const handler: Handlers = {
	async POST(req, _ctx) {
		const form = await req.formData();

		const post: Post = {
			title: getRequiredFormValue(form, "title"),
			published: getRequiredFormValue(form, "published"),
			tags: getRequiredFormValue(form, "tags").split(","),
			genre: getRequiredFormValue(form, "genre") as PostFormat,
			permalink: getRequiredFormValue(form, "permalink"),
			contentHtml: getRequiredFormValue(form, "contentHtml"),
		};

		await updatePost(post);

		const headers = new Headers({ "Location": "/shikwasa" });

		return new Response(null, { status: 303, headers });
	},
};

export default async function Create(_req: Request, ctx: RouteContext) {
	const permalink = ctx.url.searchParams.get("permalink");

	if (permalink === null) {
		return new Response(null, { status: 404 });
	}

	const post = await getPost(permalink);

	return (
		<>
			<head>
				<title>Edit post</title>
			</head>

			<main>
				<form method="post">
					<label>
						Title:
						<input type="title" name="title" value={post.title} />
					</label>

					<label>
						Published:
						<input
							type="published"
							name="published"
							value={post.published}
						/>
					</label>

					<label>
						Tags:
						<input
							type="tags"
							name="tags"
							value={post.tags.join(",")}
							placeholder="css, javascript,o"
						/>
					</label>

					<label>
						Genre:
						<input type="genre" name="genre" value={post.genre} />
					</label>

					<label>
						Permalink:
						<input
							type="permalink"
							name="permalink"
							value={post.permalink}
						/>
					</label>

					<label>
						Content HTML:
						<textarea
							type="contentHtml"
							name="contentHtml"
							value={post.contentHtml}
						/>
					</label>

					<button type="submit">Edit post</button>
				</form>
			</main>
		</>
	);
}

function getRequiredFormValue(form: FormData, key: keyof Post) {
	const value = form.get(key);

	if (value === null) {
		throw new Error(`Missing required form data: ${key}.`);
	}

	return value.toString();
}
