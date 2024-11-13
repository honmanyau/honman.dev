import { PageProps } from "$fresh/server.ts";
import HomeButton from "@/components/HomeButton.tsx";

import ColorSchemeToggle from "../../islands/ColorSchemeToggle.tsx";

export default function Layout({ Component }: PageProps) {
    return (
        <main class="post-page-layout">
            <div></div>
            <Component />
            <div class="side-controls bento-item">
                <HomeButton />
                <ColorSchemeToggle />
            </div>
        </main>
    );
}
