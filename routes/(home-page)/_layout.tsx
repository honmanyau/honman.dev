import { PageProps } from "$fresh/server.ts";

import HomeButton from "@/components/HomeButton.tsx";
import ColorSchemeToggle from "@/islands/ColorSchemeToggle.tsx";

export default function Layout({ Component }: PageProps) {
    return (
        <main class="home-page-layout">
            <Component />
            <div
                class="home-page-layout-right bento"
                style={{ "--columns": 1 }}
            >
                <HomeButton disabled />
                <ColorSchemeToggle />
            </div>
        </main>
    );
}
