import { signal } from "@preact/signals";
import { toKebabCase } from "@std/text";
import { createElement } from "preact";

import { type Post, PostFormat } from "@/db/schema/post.ts";

interface Props {
    post?: Post;
}

export function PostForm(props: Props) {
    const editingExistingPost = props.post !== undefined;
    const permalink = signal(props.post?.permalink);

    const handleTitleChange = (
        event: createElement.JSX.TargetedInputEvent<HTMLInputElement>,
    ) => {
        if (editingExistingPost) return;

        permalink.value = toKebabCase(event.currentTarget?.value);
    };

    return (
        <form method="post">
            <p>
                <label for="permalink">Permalink (readonly)</label>
                <input
                    id="permalink"
                    type="text"
                    name="permalink"
                    value={permalink}
                    readonly
                />
            </p>
            <p>
                <label for="date">Date</label>
                <input
                    id="date"
                    type="text"
                    name="date"
                    value={props.post?.date ||
                        new Date().toISOString().split("T")[0]}
                />
            </p>
            <p>
                <label for="title">Title</label>
                <input
                    id="title"
                    type="text"
                    name="title"
                    value={props.post?.title}
                    onInput={handleTitleChange}
                />
            </p>
            <p>
                <label for="description">Description</label>
                <input
                    id="description"
                    type="text"
                    name="description"
                    value={props.post?.description}
                    onInput={handleTitleChange}
                />
            </p>
            <p>
                <label for="tags">Tags</label>
                <input
                    id="tags"
                    type="text"
                    name="tags"
                    value={props.post?.tags.join(",")}
                    placeholder="css, javascript"
                />
            </p>
            <p>
                <label for="genre">Genre</label>
                <select id="genre" name="genre">
                    {Object.values(PostFormat).map((genre) => (
                        <option
                            value={genre}
                            selected={genre === PostFormat.POST}
                        >
                            {genre}
                        </option>
                    ))}
                </select>
            </p>
            <p>
                <label for="contentMarkdown">Content markdown</label>
                <textarea
                    id="contentMarkdown"
                    name="contentMarkdown"
                    rows={16}
                    value={props.post?.contentMarkdown}
                />
            </p>
            <button type="submit" name="createButton" value="true">
                {editingExistingPost ? "Edit" : "Create"} post
            </button>
            <button type="submit" formaction="/api/posts/delete">
                Delete post
            </button>
        </form>
    );
}
