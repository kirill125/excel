import { ExcelComponent } from "@core/ExcelComponent";
import { createTable } from "./table.template";

export class Table extends ExcelComponent {
    constructor($root) {
        super($root, {
            name: "Table",
            listeners: ["input"]
        });
    }

    static className = "excel__table";
    toHTML() {
        return createTable(23);
    }
    onInput(event) {
        console.log("Table: onInput", event.target.textContent.trim());
    }
}