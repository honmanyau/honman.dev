import { signal } from "@preact/signals";
import { toKebabCase } from "@std/text";
import { createElement } from "preact";

import type { Post } from "@/db/schema/post.ts";

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
                <label for="published">Published</label>
                <input
                    id="published"
                    type="text"
                    name="published"
                    value={props.post?.published}
                />
            </p>
            <p>
                <label for="tags">Tags</label>
                <input
                    id="tags"
                    type="text"
                    name="tags"
                    value={props.post?.tags.join(",")}
                    placeholder="css, javascript,o"
                />
            </p>
            <p>
                <label for="genre">Genre</label>
                <input
                    id="genre"
                    type="text"
                    name="genre"
                    value={props.post?.genre}
                />
            </p>
            <p>
                <label for="contentMarkdown">Content markdown</label>
                <textarea
                    id="contentMarkdown"
                    type="text"
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
