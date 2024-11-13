import { useSignal } from "@preact/signals";

import { ColorMode } from "@/lib/snowbell/mod.ts";

export default function ColorSchemeToggle() {
    if (!globalThis.snowbell) {
        return null;
    }

    const mode = useSignal(globalThis.snowbell?.colorMode || ColorMode.LIGHT);
    const iconClass = mode.value && getCssIconClass(mode.value);
    const title = `Toggle to ${
        mode.value === ColorMode.LIGHT ? "dark" : "light"
    } mode.`;

    const toggleColorMode = () => {
        const nextMode = mode.value === ColorMode.LIGHT
            ? ColorMode.DARK
            : ColorMode.LIGHT;

        globalThis.snowbell?.setColorMode(nextMode);
        mode.value = nextMode;
    };

    return (
        <button
            class="bento-icon"
            onClick={toggleColorMode}
            title={title}
        >
            <span class={`icon--material-symbols ${iconClass}`}></span>
        </button>
    );
}

function getCssIconClass(colorMode: ColorMode): string {
    switch (colorMode) {
        case ColorMode.LIGHT:
            return "icon--material-symbols--light-mode-outline-rounded";
        case ColorMode.DARK:
            return "icon--material-symbols--dark-mode-rounded";
        case ColorMode.SYSTEM:
            return "icon--material-symbols--computer-outline-rounded";
        default:
            throw new Error("Unknown color mode: " + colorMode);
    }
}
