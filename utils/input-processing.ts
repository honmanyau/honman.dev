import DOMPurify from "dompurify";
import hljs from "highlight.js/lib/core";
import bash from "highlight.js/lib/languages/bash";
import css from "highlight.js/lib/languages/css";
import javascript from "highlight.js/lib/languages/javascript";
import typescript from "highlight.js/lib/languages/typescript";
import xml from "highlight.js/lib/languages/xml";
import { JSDOM } from "jsdom";
import { Marked } from "marked";
import { markedHighlight } from "marked-highlight";

hljs.registerLanguage("bash", bash);
hljs.registerLanguage("css", css);
hljs.registerLanguage("html", xml);
hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("typescript", typescript);
hljs.registerLanguage("plaintext", typescript);

export { hljs };

export const marked = new Marked(
    markedHighlight({
        langPrefix: "hljs language-",
        highlight(code, maybeLanguage) {
            const language = hljs.getLanguage(maybeLanguage)
                ? maybeLanguage
                : "plaintext";

            return hljs.highlight(code, { language }).value;
        },
    }),
);

export function sanitizeHtml(html: string) {
    const window = new JSDOM("").window;
    const purify = DOMPurify(window);

    if (purify.removed.length > 0) {
        console.log(
            "⚠️ Something was removed when sanitising a blog post!",
            purify.removed,
        );

        Deno.exit(1);
    }

    return purify.sanitize(html);
}
