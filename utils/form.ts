export function getRequiredFormValue(form: FormData, key: string) {
    const value = form.get(key);

    if (value === null) {
        throw new Error(`Missing required form data: ${key}.`);
    }

    return value.toString();
}
