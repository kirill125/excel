import { Table } from "./Table";

export function shouldResize(event) {
    return event.target.dataset.resize;
}

export function isCell(event) {
    return event.target.dataset.type === "cell";
}

export function nextEl(key, { col, row }) {
    const MIN_VALUE = 0;
    const MAX_COLS = 25;
    const MAX_ROWS = Table.rowsNumber - 1;
    switch (key) {
        case "Enter":
        case "ArrowDown":
            row = row + 1 > MAX_ROWS ? MAX_ROWS : row + 1;
            break;
        case "Tab":
        case "ArrowRight":
            col = col + 1 > MAX_COLS ? MAX_COLS : col + 1;
            break;
        case "ArrowLeft":
            col = col - 1 < MIN_VALUE ? MIN_VALUE : col - 1;
            break;
        case "ArrowUp":
            row = row - 1 < MIN_VALUE ? MIN_VALUE : row - 1;
            break;
        default: break;
    }
    return `[data-id="${row}:${col}"]`;
}