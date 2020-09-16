import { ExcelComponent } from "@core/ExcelComponent";

export class Header extends ExcelComponent {
    constructor($root, options) {
        super($root, {
            name: "Header",
            listeners: ["input"],
            ...options
        });
    }
    static className = "excel__header";
    toHTML() {
        return `<input type="text" class="input" value="Новая таблица">
        <div>
            <div class="button">
                <span class="material-icons">delete_forever</span>
            </div>
            <div class="button">
                <span class="material-icons">exit_to_app
                </span>
            </div>
        </div>`;
    }
    onInput(event) {
        console.log("Header: onInput", event.target.textContent);
    }
}