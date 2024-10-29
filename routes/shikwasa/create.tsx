import { Handlers } from "$fresh/server.ts";

import { createPost } from "@/db/repository/post.ts";
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
			</head>

			<main>
				<form method="post">
					<label>
						Title:
						<input type="title" name="title" value="" />
					</label>

					<label>
						Published:
						<input type="published" name="published" value="" />
					</label>

					<label>
						Tags:
						<input
							type="tags"
							name="tags"
							value=""
							placeholder="css, javascript,o"
						/>
					</label>

					<label>
						Genre:
						<input type="genre" name="genre" value="" />
					</label>

					<label>
						Permalink:
						<input type="permalink" name="permalink" value="" />
					</label>

					<label>
						Content HTML:
						<textarea
							type="contentHtml"
							name="contentHtml"
							value=""
						/>
					</label>

					<button type="submit">Create post</button>
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
