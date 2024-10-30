import { Handlers, type RouteContext } from "$fresh/server.ts";

import { createPost } from "@/db/repository/post.ts";
import type { Post } from "@/db/schema/post.ts";
import { getRequiredFormValue } from "@/utils/form.ts";
import { marked, sanitizeHtml } from "@/utils/input-processing.ts";

export const handler: Handlers = {
	async POST(req, _ctx) {
		const form = await req.formData();
		const data = JSON.parse(
			getRequiredFormValue(form, "importData"),
		) as Post[];

		for (const entry of data) {
			const unsanitizedContentHtml = await marked.parse(
				entry.contentMarkdown,
			);
			const contentHtml = sanitizeHtml(unsanitizedContentHtml);

			entry.contentHtml = contentHtml;

			await createPost(entry);
		}

		const headers = new Headers({ "Location": "/shikwasa" });

		return new Response(null, { status: 303, headers });
	},
};

export default async function Create(_req: Request, ctx: RouteContext) {
	return (
		<>
			<head>
				<title>Edit post</title>
				<meta name="robots" content="noindex, nofollow" />
			</head>

			<main>
				<form method="post">
					<p>
						<label for="importData">Import data (JSON)</label>
						<textarea
							id="importData"
							name="importData"
							rows={16}
						/>
					</p>
					<button type="submit">Import posts</button>
				</form>
			</main>
		</>
	);
}
