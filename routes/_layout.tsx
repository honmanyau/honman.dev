import { PageProps } from "$fresh/server.ts";

import ColorSchemeToggle from "@/islands/ColorSchemeToggle.tsx";

export default function Layout({ Component }: PageProps) {
    return (
        <main class="bento-box">
            <div class="bento-compartment-icon bento-area-color-mode-toggle">
                <ColorSchemeToggle />
            </div>
            <Component />
        </main>
    );
}
