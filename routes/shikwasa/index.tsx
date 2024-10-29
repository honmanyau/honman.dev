import { type RouteContext } from "$fresh/server.ts";

import { indexPosts } from "@/db/repository/post.ts";

export default async function Shikwasa(_req: Request, _ctx: RouteContext) {
	const posts = await indexPosts({ sort: "desc" });

	return (
		<>
			<head>
				<title>Shikwasa</title>
			</head>

			<main>
				<ul>
					{posts.map((post) => (
						<li>
							<a
								href={`/shikwasa/edit?permalink=${post.permalink}`}
							>
								{JSON.stringify(post)}
							</a>
						</li>
					))}
				</ul>
			</main>
		</>
	);
}
