import { ExcelComponent } from "@core/ExcelComponent";
import { $ } from "@core/dom";

export class Formula extends ExcelComponent {
    constructor($root, options) {
        super($root, {
            name: "Formula",
            listeners: ["input", "click", "keydown"],
            ...options
        });
    }
    static className = "excel__formula";

    init() {
        super.init();
        this.$formula = this.$root.find("#formula");
        this.$on("table:input", (data) => this.$formula.text = data);
        this.$on("table:select", (data) => this.$formula.text = data);
    }

    toHTML() {
        return `<div class="info">fx</div>
            <div id="formula" class="input" contenteditable spellcheck="false"></div>`;
    }

    onInput(event) {
        this.$emit("formula:input", $(event.target).text);
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