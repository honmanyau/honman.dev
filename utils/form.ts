import type { Post } from "@/db/schema/post.ts";

export function getRequiredFormValue(form: FormData, key: keyof Post) {
    const value = form.get(key);

    if (value === null) {
        throw new Error(`Missing required form data: ${key}.`);
    }

    return value.toString();
}
