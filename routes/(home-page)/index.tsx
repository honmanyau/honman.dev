import type { RouteContext } from "$fresh/server.ts";

import BentoAreaLatestPost from "@/components/BentoAreaLatestPost.tsx";
import Metadata from "@/components/Metadata.tsx";
import SiteIntro from "@/components/SiteIntro.tsx";
import { indexPosts } from "@/db/repository/post.ts";

export default async function Home(req: Request, _ctx: RouteContext) {
	const posts = await indexPosts({ sort: "desc" });

	return (
		<>
			<Metadata
				title="Honman Yau"
				description="Honman's canvas and laboratory on the Internet."
				ogType="website"
				url="https://honman.dev"
				disableTitleSuffix
			/>
			<SiteIntro />
			<BentoAreaLatestPost posts={posts.slice(0, 7)} />
		</>
	);
}
