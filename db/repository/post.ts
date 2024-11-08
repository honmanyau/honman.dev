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
	const posts = await getStaticPosts();

	for await (const entry of iterator) {
		posts.push(entry.value);
	}

	if (!sort) {
		return posts;
	}

	return sort === "desc"
		? posts.sort((a, b) => b.date.localeCompare(a.date))
		: posts.sort((a, b) => a.date.localeCompare(b.date));
}

export async function createPost(data: Post) {
	const post = PostSchema.parse(data);
	const key = [POSTS_KEY, post.permalink];

	const result = await kv.atomic().check({ key, versionstamp: null }).set(
		key,
		post,
	)
		.commit();

	if (!result.ok) {
		throw new Deno.errors.AlreadyExists();
	}

	return result;
}

export function updatePost(data: Post) {
	const post = PostSchema.parse(data);
	const key = [POSTS_KEY, post.permalink];

	getPost(post.permalink);

	return kv.set(key, post);
}

export function upsertPost(data: Post) {
	const post = PostSchema.parse(data);
	const key = [POSTS_KEY, post.permalink];

	return kv.set(key, post);
}

export async function deletePost(permalink: string) {
	const key = [POSTS_KEY, permalink];

	return kv.delete(key);
}

export async function createStaticPost(data: Post): Promise<void> {
	const post = PostSchema.parse(data);

	try {
		await Deno.writeTextFile(
			Deno.cwd() + `/static/posts/${post.permalink}.json`,
			JSON.stringify(post),
		);
	} catch {
		// We shouldn't be writing static files in prod (we can't with Deno
		// on Deploy).
	}
}

export async function getStaticPosts(): Promise<Post[]> {
	const posts: Post[] = [];

	try {
		const files = await Deno.readDir(`${Deno.cwd()}/static/posts`);

		for await (const file of files) {
			const text = await Deno.readTextFile(
				`${Deno.cwd()}/static/posts/${file.name}`,
			);

			posts.push(JSON.parse(text));
		}
	} catch {
		// Fail silently so that we don't break the app if we somehow can't
		// load static posts.
	}

	return posts;
}
