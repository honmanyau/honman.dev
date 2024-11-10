export default function SiteIntro() {
    return (
        <div class="site-intro bento-item">
            <h1 class="no-margin">
                This website is the canvas and laboratory of{" "}
                <span style={{ fontFamily: `var(--system-serif)` }}>
                    Honman
                </span>.
            </h1>
            <h2>
                I write about coding and everyday things; mess around with CSS;
                and work on coding projects.
            </h2>
            <p class="site-intro-social-icons">
                <a
                    target="_blank"
                    href="https://github.com/honmanyau"
                    title="Honman's GitHub Profile"
                >
                    <span class="icon--material-symbols icon--mdi icon--mdi--github">
                    </span>
                </a>
                <a
                    target="_blank"
                    href="https://www.linkedin.com/in/honmanyau"
                    title="Honman's LinkedIn Profile"
                >
                    <span class="icon--material-symbols icon--mdi icon--mdi--linkedin">
                    </span>
                </a>
                <a
                    href="/feed.xml"
                    title="RSS feed for honman.dev"
                >
                    <span class="icon--material-symbols icon--mdi icon--mdi--rss-box">
                    </span>
                </a>
            </p>
        </div>
    );
}
