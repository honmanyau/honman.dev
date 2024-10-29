import { type Post, PostSchema } from "@/db/schema/post.ts";

const kv = await Deno.openKv();
const POSTS_KEY = "posts";

export async function getPost(permalink: string) {
	const key = [POSTS_KEY, permalink];
	const post = (await kv.get<Post>(key)).value;

	if (!post) {
		throw new Deno.errors.NotFound();
	}

	return post;
}

export async function indexPosts({ sort }: { sort?: "asc" | "desc" } = {}) {
	const iterator = kv.list<Post>({ prefix: [POSTS_KEY] });
	const posts = [];

	for await (const entry of iterator) {
		posts.push(entry.value);
	}

	if (!sort) {
		return posts;
	}

	return sort === "desc"
		? posts.sort((a, b) => b.published.localeCompare(a.published))
		: posts.sort((a, b) => a.published.localeCompare(b.published));
}

export function createPost(data: Post) {
	const post = PostSchema.parse(data);
	const key = [POSTS_KEY, post.permalink];

	return kv.atomic().check({ key, versionstamp: null }).set(key, post)
		.commit();
}

export function updatePost(data: Post) {
	const post = PostSchema.parse(data);
	const key = [POSTS_KEY, post.permalink];

	return kv.set(key, post);
}
