import { PageProps } from "$fresh/server.ts";

import SocialIcons from "@/components/SocialIcons.tsx";
import ColorSchemeToggle from "../../islands/ColorSchemeToggle.tsx";

export default function Layout({ Component }: PageProps) {
    return (
        <main class="post-page-layout">
            <div></div>
            <Component />
            <div class="bento" style={{ "--columns": 3 }}>
                <ColorSchemeToggle />
                <SocialIcons />
            </div>
        </main>
    );
}
