import { ExcelComponent } from "@core/ExcelComponent";
import { $ } from "@core/dom";

export class Formula extends ExcelComponent {
    constructor($root, options) {
        super($root, {
            name: "Formula",
            listeners: ["input", "click", "keydown"],
            subscribe: ["currentText"],
            ...options
        });
    }
    static className = "excel__formula";

    init() {
        super.init();
        this.$formula = this.$root.find("#formula");
        // this.$on("table:input", (data) => this.$formula.text = data);
        // this.$subscribe((state) => this.$formula.text = state.currentText);
        this.$on("table:select", ($cell) => this.$formula.text = $cell.data.value);
    }

    toHTML() {
        return `<div class="info">fx</div>
            <div id="formula" class="input" contenteditable spellcheck="false"></div>`;
    }

    storeChanged({ currentText }) {
        this.$formula.text = currentText;
    }

    onInput(event) {
        this.$emit("formula:input", $(event.target).text);
        // this.$dispatch(actions.changeText({}))
    }

    onKeydown(event) {
        const keys = ["Enter", "Tab"];
        if (keys.includes(event.code)) {
            event.preventDefault();
            this.$emit("formula:enter");
        }
    }

    onClick() { }
}