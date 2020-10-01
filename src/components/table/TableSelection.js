import { $ } from "@core/dom";

export class TableSelection {
    static className = "selected";

    constructor() {
        this.group = [];
        this.firstEl = null;
    }
    // $el instanceof Dom
    select($el) {
        this.clear();
        this.firstEl = $el;
        this.group.push($el);
        $el.focus().addClass(TableSelection.className);
    }
    selectGroup($el) {
        this.clear();
        const firstElCoords = this.firstEl.id(":");
        const secondElCoords = $el.id(":");
        const [minX, maxX] = [firstElCoords.row, secondElCoords.row].sort((a, b) => a-b);
        const [minY, maxY] = [firstElCoords.col, secondElCoords.col].sort((a, b) => a-b);
        for (let i = minX; i <= maxX; i++) {
            for (let j = minY; j <= maxY; j++) {
                const $newEl = $(`[data-id="${i}:${j}"]`);
                this.group.push($newEl);
                $newEl.addClass(TableSelection.className);
            }
        }
    }

    get selectedIds() {
        return this.group.map($el => $el.id());
    }

    clear() {
        this.group.forEach($cell => $cell.removeClass(TableSelection.className));
        this.group = [];
    }

    applyStyle(style) {
        this.group.forEach($el => $el.css(style));
    }
}