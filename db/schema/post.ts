import { z } from "npm:zod";

export enum PostFormat {
	ARTICLE = "Article",
	ESSAY = "Essay",
	NOTE = "Note",
	POST = "Post",
	SNIPPET = "Snippet",
}

export const PostSchema = z.object({
	title: z.string().min(1),
	description: z.string().min(1),
	date: z.string().date(),
	tags: z.array(z.string()).default([]),
	genre: z.nativeEnum(PostFormat).default(PostFormat.POST),
	permalink: z.string().min(1).regex(/[a-zA-Z0-9\-]+/),
	contentMarkdown: z.string().min(1),
	contentHtml: z.string().min(1),
});

export type Post = z.infer<typeof PostSchema>;
