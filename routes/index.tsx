import type { RouteContext } from "$fresh/server.ts";

import BentoAreaLatestPost from "@/components/BentoAreaLatestPost.tsx";
import BentoAreaSiteIntro from "@/components/BentoAreaSiteIntro.tsx";
import { indexPosts } from "@/db/repository/post.ts";

export default async function Home(_req: Request, _ctx: RouteContext) {
	const posts = await indexPosts({ sort: "desc" });

	return (
		<>
			<BentoAreaSiteIntro />
			<BentoAreaLatestPost post={posts[0]} />
		</>
	);
}
