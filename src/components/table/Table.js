import { ExcelComponent } from "@core/ExcelComponent";
import { createTable } from "./table.template";
import { resizeHandler } from "./table.resize";
import { isCell, nextEl, shouldResize } from "./table.function";
import { TableSelection } from "./TableSelection";
import { $ } from "@core/dom";

export class Table extends ExcelComponent {
    constructor($root, options) {
        super($root, {
            name: "Table",
            listeners: ["input", "mousedown"/* , "mouseup"*/, "click", "keydown"],
            ...options
        });
        // this.colIndex = "";
        // this.downX = "";
        // this.upX = "";
    }

    static className = "excel__table";
    static rowsNumber = 23;
    toHTML() {
        return createTable(Table.rowsNumber);
    }

    prepare() {
        this.selection = new TableSelection();
    }

    init() {
        super.init();
        const $cell = this.$root.find("[data-id='0:0']");
        this.selection.select($cell);
        this.$emit("table:select", this.selection.firstEl.text);
        this.$on("formula:input", (data) => this.selection.firstEl.text = data);
        this.$on("formula:enter", () => this.selection.firstEl.focus());
    }
    onInput(event) {
        this.$emit("table:input", $(event.target).text);
    }

    onMousedown(event) {
        if (shouldResize(event)) {
            resizeHandler(this.$root, event);
        }
    }

    onClick(event) {
        if (isCell(event)) {
            if (event.shiftKey) {
                this.selection.selectGroup($(event.target));
            } else {
                this.selection.select($(event.target));
            }
        }
        this.$emit("table:select", this.selection.firstEl.text);
    }

    onKeydown(event) {
        if (!event.shiftKey) {
            const keys = ["Enter", "ArrowDown", "Tab", "ArrowRight", "ArrowLeft", "ArrowUp"];
            if (keys.includes(event.code)) {
                event.preventDefault();
                const $next = this.$root.find(nextEl(event.code, this.selection.firstEl.id(":")));
                this.selection.select($next);
            }
        }
        this.$emit("table:select", this.selection.firstEl.text);
    }

    // onMousedown(event) {
    //     if (event.target.dataset.resize) {
    //         console.log("Start resizing", event.target.dataset.resize);
    //         this.colIndex = getIndexfromChar(event.target.parentNode.textContent);
    //         this.downX = event.clientX;
    //         // console.log(event);
    //         this.$root.on("mousemove", this.onMousemove);
    //     }
    // }
    // onMousemove(event) {
    //     console.log("Table: onMousemove");
    // }
    // onMouseup(event) {
    //     console.log("Table: onMouseup");
    //     this.$root.off("mousemove", this.onMousemove);
    //     // console.log(event);
    //     this.upX = event.clientX;
    //     const width = this.upX - this.downX;
    //     console.log(width);
    //     resizeCol(this.colIndex, width);
    // }
}

// function getIndexfromChar(char) {
//     return char.trim().charCodeAt() - 65;
// }