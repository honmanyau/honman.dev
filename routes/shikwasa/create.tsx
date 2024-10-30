import { Handlers } from "$fresh/server.ts";

import { createPost } from "@/db/repository/post.ts";
import type { Post, PostFormat } from "@/db/schema/post.ts";
import { PostForm } from "@/islands/PostForm.tsx";
import { getRequiredFormValue } from "@/utils/form.ts";
import { marked, sanitizeHtml } from "@/utils/input-processing.ts";

export const handler: Handlers = {
	async POST(req, _ctx) {
		const form = await req.formData();
		const contentMarkdown = getRequiredFormValue(form, "contentMarkdown");
		const unsanitizedContentHtml = await marked.parse(contentMarkdown);
		const contentHtml = sanitizeHtml(unsanitizedContentHtml);

		const post: Post = {
			title: getRequiredFormValue(form, "title"),
			description: getRequiredFormValue(form, "description"),
			published: getRequiredFormValue(form, "published"),
			tags: getRequiredFormValue(form, "tags").split(","),
			genre: getRequiredFormValue(form, "genre") as PostFormat,
			permalink: getRequiredFormValue(form, "permalink"),
			contentMarkdown,
			contentHtml,
		};

		await createPost(post);

		const headers = new Headers({ "Location": "/shikwasa" });

		return new Response(null, { status: 303, headers });
	},
};

export default function Shikwasa() {
	return (
		<>
			<head>
				<title>Create post</title>
				<meta name="robots" content="noindex, nofollow" />
			</head>
			<main>
				<PostForm />
			</main>
		</>
	);
}
