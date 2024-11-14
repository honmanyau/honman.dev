import { type RouteContext } from "$fresh/server.ts";

import { indexPosts } from "@/db/repository/post.ts";
import type { Post } from "@/db/schema/post.ts";

export default async function Shikwasa(_req: Request, _ctx: RouteContext) {
	const posts = await indexPosts({ sort: "desc" });

	return (
		<>
			<head>
				<title>Shikwasa</title>
				<meta name="robots" content="noindex, nofollow" />
			</head>

			<main style="font-family: monospace">
				<a href="/">Home</a>

				<ul>
					{posts.map(makeListItem)}
				</ul>

				<form method="POST" action="/api/posts/delete-all">
					<button type="submit">Delete all</button>
				</form>
			</main>
		</>
	);
}

function makeListItem(post: Post) {
	return (
		<li>
			<a
				href={`/shikwasa/edit?permalink=${post.permalink}`}
			>
				<b>{post.date}</b> — {post.title}
			</a>
		</li>
	);
}
