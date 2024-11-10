import { useSignal } from "@preact/signals";

import { ColorMode } from "@/lib/snowbell/mod.ts";

export default function ColorSchemeToggle() {
    const mode = useSignal(globalThis.snowbell?.colorMode);
    const iconClass = mode.value && getCssIconClass(mode.value);
    const style = { gridColumn: "-2 / span 1", gridRow: "1" };

    const toggleColorMode = () => {
        const nextMode = mode.value === ColorMode.LIGHT
            ? ColorMode.DARK
            : ColorMode.LIGHT;

        globalThis.snowbell?.setColorMode(nextMode);
        mode.value = nextMode;
    };

    return (
        <div class="bento-3">
            <div class="bento-item bento-item-icon" style={style}>
                <button
                    class="bento-icon"
                    onClick={toggleColorMode}
                >
                    <span class={`icon--material-symbols ${iconClass}`}></span>
                </button>
            </div>
        </div>
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
