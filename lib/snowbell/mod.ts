declare global {
    var snowbell: Snowy;
}

interface Snowy {
    [GLOBAL_INSTANCE_IDENTIFIER]: true;
    colorMode: ColorMode;
    setColorMode: (colorMode: ColorMode) => ColorMode;
}

interface InitializationOptions {
    localStorageKey?: string;
}

interface StorageManager {
    getItem: (key: LocalStorageKeys) => string | null;
    setItem: (key: LocalStorageKeys, value: string) => void;
}

type LocalStorageKeys = "colorMode";

export enum ColorMode {
    LIGHT = "light",
    DARK = "dark",
    SYSTEM = "system",
}

const DEFAULT_GLOBAL_NAMESPACE = "snowbell";
const DEFAULT_LOCAL_STORAGE_NAMESPACE = "snowbell";
const GLOBAL_INSTANCE_IDENTIFIER = Symbol("snowbell");

let storageManager: StorageManager;

export function initialize({
    localStorageKey = DEFAULT_LOCAL_STORAGE_NAMESPACE,
}: InitializationOptions = {}): Snowy {
    const existingInstance = getExistingInstance();

    if (existingInstance) return existingInstance;

    initializeLocalStorageManager(localStorageKey);

    const storedColorMode = getStoredColorMode();
    const newInstance = {
        [GLOBAL_INSTANCE_IDENTIFIER]: true,
        colorMode: storedColorMode || getPreferredColorScheme(),
        setColorMode,
    } as const;

    globalThis[DEFAULT_GLOBAL_NAMESPACE] = newInstance;

    if (document) {
        setDocumentElementDataAttribute(newInstance.colorMode);

        globalThis.addEventListener("load", addTransitionClassToBody);
        globalThis.addEventListener(
            "beforeunload",
            () =>
                document.removeEventListener("load", addTransitionClassToBody),
        );
    }

    return newInstance;
}

function initializeLocalStorageManager(namespace: string) {
    storageManager = {
        getItem: function (key: LocalStorageKeys) {
            return localStorage.getItem(`${namespace}.${key}`);
        },
        setItem: function (key: LocalStorageKeys, value: string) {
            localStorage.setItem(`${namespace}.${key}`, value);
        },
    };

    return storageManager;
}

function getPreferredColorScheme(): ColorMode {
    const prefersLightScheme = globalThis.matchMedia?.(
        "(prefers-color-scheme: light)",
    ).matches;

    if (prefersLightScheme) return ColorMode.LIGHT;

    const prefersDarkScheme = globalThis.matchMedia?.(
        "(prefers-color-scheme: dark)",
    ).matches;

    if (prefersDarkScheme) return ColorMode.DARK;

    return ColorMode.SYSTEM;
}

function addTransitionClassToBody() {
    document.body.classList.add("transition-colors");
}

function getStoredColorMode(): ColorMode | undefined {
    const storedColorMode = storageManager.getItem("colorMode");

    if (storedColorMode === ColorMode.LIGHT) return ColorMode.LIGHT;
    if (storedColorMode === ColorMode.DARK) return ColorMode.DARK;
    if (storedColorMode === ColorMode.SYSTEM) return ColorMode.SYSTEM;
}

function getExistingInstance() {
    const existingInstance = globalThis[DEFAULT_GLOBAL_NAMESPACE];

    if (existingInstance) {
        validateSnowyInstance(globalThis[DEFAULT_GLOBAL_NAMESPACE]);
        warnAboutMultipleInitialization();

        return existingInstance;
    }
}

function setColorMode(this: Snowy, colorMode: ColorMode): ColorMode {
    if (colorMode === this.colorMode) return this.colorMode;

    this.colorMode = colorMode;
    storageManager.setItem("colorMode", colorMode);
    setDocumentElementDataAttribute(this.colorMode);

    return colorMode;
}

function setDocumentElementDataAttribute(colorMode: ColorMode): void {
    document.body.setAttribute("data-color-mode", colorMode);
}

function validateSnowyInstance(snowyInstance: Partial<Snowy>): Snowy {
    if (snowyInstance[GLOBAL_INSTANCE_IDENTIFIER]) {
        const likelyNotASnowyInstance = !Object.prototype.hasOwnProperty.call(
            globalThis[DEFAULT_GLOBAL_NAMESPACE],
            GLOBAL_INSTANCE_IDENTIFIER,
        );

        if (likelyNotASnowyInstance) {
            const errorMessage = [
                "`snowyColorMode` is already defined in the global",
                "namespace, and it doesn't appear to be an instance of Snowy!",
            ].join(" ");

            throw new Error(errorMessage);
        }
    }

    return snowyInstance as Snowy;
}

function warnAboutMultipleInitialization() {
    console.warn([
        "`snowyColorMode` is already defined in the global namespace.",
        "There are likely multiple places in your code initializing Snowy.",
        "No new instance of Snowy has been created.",
    ].join(" "));
}

// initialize();
