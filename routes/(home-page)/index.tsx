import type { RouteContext } from "$fresh/server.ts";

import BentoAreaLatestPost from "@/components/BentoAreaLatestPost.tsx";
import SiteIntro from "@/components/SiteIntro.tsx";
import { indexPosts } from "@/db/repository/post.ts";

export default async function Home(_req: Request, _ctx: RouteContext) {
	const posts = await indexPosts({ sort: "desc" });

	return (
		<>
			<SiteIntro />
			<BentoAreaLatestPost posts={posts.slice(0, 7)} />
		</>
	);
}