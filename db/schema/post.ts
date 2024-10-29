import { z } from "npm:zod";

export enum PostFormat {
	ARTICLE = "Article",
	ESSAY = "Essay",
	NOTE = "Note",
	POST = "Post",
	SNIPPET = "Snippet",
}

export const PostSchema = z.object({
	title: z.string(),
	published: z.string().date(),
	tags: z.array(z.string()).default([]),
	genre: z.nativeEnum(PostFormat).default(PostFormat.POST),
	permalink: z.string(),
	contentMarkdown: z.string(),
	contentHtml: z.string(),
});

export type Post = z.infer<typeof PostSchema>;
