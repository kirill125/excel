import { CHANGE_TEXT, CHANGE_STYLES, TABLE_RESIZE, APPLY_STYLE, CHANGE_TITLE } from "./types";

export function tableResize(result) {
    // const type = result.type.toUpperCase() + "_RESIZE";
    // delete result.resizeEl;
    return {
        type: TABLE_RESIZE,
        result
    };
}

export function changeText(data) {
    return {
        type: CHANGE_TEXT,
        data
    };
}

export function changeStyles(data) {
    return {
        type: CHANGE_STYLES,
        data
    };
}
// value, ids
export function applyStyle(data) {
    return {
        type: APPLY_STYLE,
        data
    };
}

export function changeTitle(data) {
    console.log(CHANGE_TITLE);
    return {
        type: CHANGE_TITLE,
        data
    };
}
