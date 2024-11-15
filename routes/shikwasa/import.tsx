import { Handlers, type RouteContext } from "$fresh/server.ts";

import { createStaticPost, upsertPost } from "@/db/repository/post.ts";
import { type Post, PostSchema } from "@/db/schema/post.ts";
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

			entry.contentHtml = sanitizeHtml(unsanitizedContentHtml);

			const byteSize = new Blob([JSON.stringify(entry)]).size;
			const withinDenoKvSizeLimit = byteSize < 64E3;

			if (withinDenoKvSizeLimit) {
				await upsertPost(entry);
			} else {
				await createStaticPost(PostSchema.parse(entry));
			}
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
