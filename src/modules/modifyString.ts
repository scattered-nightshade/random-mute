export function capitalizeFirstLetter(string: string): string {
    // Capitalize the first letter of a string
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function isValidHttpUrl(string: string): boolean {
    // Attempt to create a URL object from the string
    try {
        new URL(string);
    }
    catch (_) {
        // If the string is not a valid URL, return false
        return false;
    }

    // If the URL object was created successfully, return true
    return true;
}
