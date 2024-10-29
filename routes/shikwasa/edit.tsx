import { Handlers, type RouteContext } from "$fresh/server.ts";

import { getPost, updatePost } from "@/db/repository/post.ts";
import type { Post, PostFormat } from "@/db/schema/post.ts";
import { PostForm } from "@/islands/PostForm.tsx";
import { marked, sanitizeHtml } from "@/utils/input-processing.ts";

export const handler: Handlers = {
	async POST(req, _ctx) {
		const form = await req.formData();
		const contentMarkdown = getRequiredFormValue(form, "contentMarkdown");
		const unsanitizedContentHtml = await marked.parse(contentMarkdown);
		const contentHtml = sanitizeHtml(unsanitizedContentHtml);

		const post: Post = {
			title: getRequiredFormValue(form, "title"),
			published: getRequiredFormValue(form, "published"),
			tags: getRequiredFormValue(form, "tags").split(","),
			genre: getRequiredFormValue(form, "genre") as PostFormat,
			permalink: getRequiredFormValue(form, "permalink"),
			contentMarkdown,
			contentHtml,
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
				<PostForm post={post} />
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
