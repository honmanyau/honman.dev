export default function BentoSocialIcons() {
    return (
        <>
            <div class="bento-area-github bento-item bento-item-icon">
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
            <div class="bento-area-linkedin bento-item bento-item-icon">
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
            <div class="bento-area-rss bento-item bento-item-icon">
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
