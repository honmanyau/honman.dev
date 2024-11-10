import { PageProps } from "$fresh/server.ts";

import BentoColorSchemeToggle from "@/islands/BentoColorSchemeToggle.tsx";

export default function Layout({ Component }: PageProps) {
    return (
        <main class="home-page-layout">
            <Component />
            <BentoColorSchemeToggle />
        </main>
    );
}
