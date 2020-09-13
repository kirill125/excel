import { ExcelComponent } from "@core/ExcelComponent";
import { createTable } from "./table.template";
import { resizeHandler } from "./table.resize";
import { shouldResize } from "./table.function";

export class Table extends ExcelComponent {
    constructor($root) {
        super($root, {
            name: "Table",
            listeners: ["input", "mousedown"/* , "mouseup"*/]
        });
        // this.colIndex = "";
        // this.downX = "";
        // this.upX = "";
    }

    static className = "excel__table";
    toHTML() {
        return createTable(23);
    }
    onInput(event) {
        console.log("Table: onInput", event.target.textContent.trim());
    }

    onMousedown(event) {
        if (shouldResize(event)) {
            resizeHandler(this.$root, event);
        }
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