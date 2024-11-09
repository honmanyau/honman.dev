import { PageProps } from "$fresh/server.ts";

import ColorSchemeToggle from "@/islands/ColorSchemeToggle.tsx";

export default function Layout({ Component }: PageProps) {
    return (
        <div class="main-container">
            <main class="bento-box">
                <ColorSchemeToggle />
                <Component />

                <div
                    class="bento-item"
                    style={{
                        gridRow: "1 / -1",
                        gridColumn: "5 / -5",
                    }}
                >
                </div>
            </main>
        </div>
    );
}
