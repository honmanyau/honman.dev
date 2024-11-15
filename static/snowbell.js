var ColorMode;
(function (ColorMode) {
    ColorMode["LIGHT"] = "light";
    ColorMode["DARK"] = "dark";
    ColorMode["SYSTEM"] = "system";
})(ColorMode || (ColorMode = {}));
const DEFAULT_GLOBAL_NAMESPACE = "snowbell";
const DEFAULT_LOCAL_STORAGE_NAMESPACE = "snowbell";
const GLOBAL_INSTANCE_IDENTIFIER = Symbol("snowbell");
let storageManager;
function initialize(
    { localStorageKey = DEFAULT_LOCAL_STORAGE_NAMESPACE } = {},
) {
    const existingInstance = getExistingInstance();
    if (existingInstance) return existingInstance;
    initializeLocalStorageManager(localStorageKey);
    const storedColorMode = getStoredColorMode();
    const newInstance = {
        [GLOBAL_INSTANCE_IDENTIFIER]: true,
        colorMode: storedColorMode || getPreferredColorScheme(),
        setColorMode,
    };
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
function initializeLocalStorageManager(namespace) {
    storageManager = {
        getItem: function (key) {
            return localStorage.getItem(`${namespace}.${key}`);
        },
        setItem: function (key, value) {
            localStorage.setItem(`${namespace}.${key}`, value);
        },
    };
    return storageManager;
}
function getPreferredColorScheme() {
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
function getStoredColorMode() {
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
function setColorMode(colorMode) {
    if (colorMode === this.colorMode) return this.colorMode;
    this.colorMode = colorMode;
    storageManager.setItem("colorMode", colorMode);
    setDocumentElementDataAttribute(this.colorMode);
    return colorMode;
}
function setDocumentElementDataAttribute(colorMode) {
    document.body.setAttribute("data-color-mode", colorMode);
}
function validateSnowyInstance(snowyInstance) {
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
    return snowyInstance;
}
function warnAboutMultipleInitialization() {
    console.warn([
        "`snowyColorMode` is already defined in the global namespace.",
        "There are likely multiple places in your code initializing Snowy.",
        "No new instance of Snowy has been created.",
    ].join(" "));
}
export { ColorMode as ColorMode, initialize as initialize };
initialize();
