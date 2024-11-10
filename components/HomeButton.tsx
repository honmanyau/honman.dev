export default function HomeButton() {
    const style = { gridColumn: "-2 / span 1", gridRow: "1" };

    return (
        <div class="bento-item bento-item-icon" style={style}>
            <a
                class={"bento-icon"}
                href="/"
                title="Return to home page."
            >
                <span class="icon--material-symbols icon--material-symbols--house-rounded">
                </span>
            </a>
        </div>
    );
}
