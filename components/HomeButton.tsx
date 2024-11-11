import type { JSX } from "preact";

export default function HomeButton(
    props: JSX.HTMLAttributes<HTMLButtonElement>,
) {
    if (props.disabled) return null;

    const style = { gridColumn: "-2 / span 1", gridRow: "2" };

    return (
        <div class="bento-item bento-item-icon" style={style}>
            <a
                class={"bento-icon" + (props.disabled ? " disabled" : "")}
                href={props.disabled ? "" : "/"}
                title="Return to home page."
            >
                <span class="icon--material-symbols icon--material-symbols--house-rounded">
                </span>
            </a>
        </div>
    );
}
