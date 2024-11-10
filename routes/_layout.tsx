import { PageProps } from "$fresh/server.ts";

import BentoSocialIcons from "@/components/BentoSocialIcons.tsx";
import BentoColorSchemeToggle from "@/islands/BentoColorSchemeToggle.tsx";

export default function Layout({ Component }: PageProps) {
    return (
        <main class="bento-box">
            <BentoColorSchemeToggle />
            <BentoSocialIcons />
            <Component />
        </main>
    );
}
