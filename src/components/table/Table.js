import { ExcelComponent } from "@core/ExcelComponent";
import { createTable } from "./table.template";
import { resizeHandler } from "./table.resize";
import { isCell, nextEl, shouldResize } from "./table.function";
import { TableSelection } from "./TableSelection";
import { $ } from "@core/dom";
import * as actions from "../redux/actions";
import { defaultStyles } from "@/constants";
import { parse } from "@core/parse";

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
        return createTable(Table.rowsNumber, this.store.getState());
    }

    prepare() {
        this.selection = new TableSelection();
    }

    init() {
        super.init();
        const $cell = this.$root.find("[data-id='0:0']");
        this.selectCell($cell);
        // this.$on("formula:input", (data) => this.selection.firstEl.text = data);
        this.$on("formula:input", (data) => {
            this.selection.firstEl
                .attr("data-value", data)
                .text = parse(data);
            console.log(this.selection.firstEl.text);
            // this.selection.firstEl.text = data;
            const id = this.selection.firstEl.id();
            this.$dispatch((actions.changeText({ value: data, id })));
        });
        this.$on("formula:enter", () => this.selection.firstEl.focus());
        this.$on("toolbar:applyStyle", value => {
            this.selection.applyStyle(value);
            this.$dispatch(actions.applyStyle({
                value,
                ids: this.selection.selectedIds
            }));
        });
        // const { colState } = this.store.getState();
        // console.log(colState);
        // Object.keys(colState).forEach(key => {
        //     this.$root.findAll(`[data-col="${key}"]`).forEach(cell => $(cell).css({ width: colState[key] + "px" }));
        // });
    }
    onInput(event) {
        // this.$emit("table:input", $(event.target).text);
        const value = $(event.target).text;
        const id = $(event.target).id();
        this.selection.firstEl.attr("data-value", $(event.target).text);
        this.$dispatch(actions.changeText({ value, id }));
    }

    selectCell($cell) {
        this.selection.select($cell);
        this.$emit("table:select", this.selection.firstEl);
        const styles = $cell.getStyles(Object.keys(defaultStyles));
        this.$dispatch(actions.changeStyles(styles));
    }

    async resizeTable(event) {
        try {
            const result = await resizeHandler(this.$root, event);
            console.log(result);
            this.$dispatch(actions.tableResize(result));
        } catch (err) {
            console.warn(err.message);
        }
        // .then((value) => {
        //     console.log(value);
        //     this.$dispatch({ type: "TABLE_RESIZE", colState: value });
        // })
        // .catch(err => console.log(err));
    }

    onMousedown(event) {
        if (shouldResize(event)) {
            this.resizeTable(event);
        }
    }

    onClick(event) {
        if (isCell(event)) {
            if (event.shiftKey) {
                this.selection.selectGroup($(event.target));
            } else {
                this.selectCell($(event.target));
            }
        }
        // this.$emit("table:select", this.selection.firstEl.text);
    }

    onKeydown(event) {
        if (!event.shiftKey) {
            const keys = ["Enter", "ArrowDown", "Tab", "ArrowRight", "ArrowLeft", "ArrowUp"];
            if (keys.includes(event.code)) {
                event.preventDefault();
                const $next = this.$root.find(nextEl(event.code, this.selection.firstEl.id(":")));
                this.selectCell($next);
                // this.selection.select($next);
            }
        }
        // this.$emit("table:select", this.selection.firstEl.text);
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