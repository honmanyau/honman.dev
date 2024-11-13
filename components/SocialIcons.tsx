export default function SocialIcons() {
    const gitHubStyle = { gridColumn: "-2 / span 1", gridRow: "2" };
    const linkedInStyle = { gridColumn: "-2 / span 1", gridRow: "3" };
    const rssStyle = { gridColumn: "-2 / span 1", gridRow: "4" };

    return (
        <>
            <div class="bento-item" style={gitHubStyle}>
                <a
                    class="bento-icon"
                    target="_blank"
                    href="https://github.com/honmanyau"
                    title="Honman's GitHub Profile"
                >
                    <span class="icon--material-symbols icon--mdi icon--mdi--github">
                    </span>
                </a>
            </div>
            <div class="bento-item" style={linkedInStyle}>
                <a
                    class="bento-icon"
                    target="_blank"
                    href="https://www.linkedin.com/in/honmanyau"
                    title="Honman's LinkedIn Profile"
                >
                    <span class="icon--material-symbols icon--mdi icon--mdi--linkedin">
                    </span>
                </a>
            </div>
            <div class="bento-item" style={rssStyle}>
                <a
                    class="bento-icon"
                    href="/feed.xml"
                    title="RSS feed for honman.dev"
                >
                    <span class="icon--material-symbols icon--mdi icon--mdi--rss-box">
                    </span>
                </a>
            </div>
        </>
    );
}
