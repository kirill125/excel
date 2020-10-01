export function capitalize(str) {
    if (typeof str === "string") {
        return str.charAt(0).toUpperCase() + str.slice(1);
    } else {
        return "";
    }
}

export function storage(key, item) {
    if (!item) {
        return JSON.parse(localStorage.getItem(key));
    }
    localStorage.setItem(key, JSON.stringify(item));
}

export function isEqual(a, b) {
    if (typeof a === "object" && typeof b === "object") {
        return JSON.stringify(a) === JSON.stringify(b);
    }
    return a===b;
}

export function toKebabCase(string) {
    return string.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, "$1-$2").toLowerCase();
}

export function toInlineStyles(styles = {}) {
    return Object.keys(styles).map(key => `${toKebabCase(key)}: ${styles[key]}`).join(";");
}

export function debounce(fn, wait) {
    let timeout;
    return function(...args) {
        const later = () => {
            clearTimeout(timeout);
            // eslint-disable-next-line
            fn.apply(this, args);
            // fn(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout( later, wait);
    };
}