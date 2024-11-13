import type { JSX } from "preact";

export default function HomeButton(
    props: JSX.HTMLAttributes<HTMLButtonElement>,
) {
    if (props.disabled) return null;

    return (
        <a
            class={"bento-icon" + (props.disabled ? " disabled" : "")}
            href={props.disabled ? "" : "/"}
            title="Return to home page."
        >
            <span class="icon--material-symbols icon--material-symbols--house-rounded">
            </span>
        </a>
    );
}
