import { createToolbar } from "./toolbar.template";
import { $ } from "@core/dom";
import ExcelStateComponent from "@core/ExcelStateComponent";
// import { defaultStyles } from "@/constants";
import { initialState } from "../redux/initialState";

export class Toolbar extends ExcelStateComponent {
    constructor($root, options) {
        super($root, {
            name: "Toolbar",
            listeners: ["click"],
            subscribe: ["currentStyles"],
            ...options
        });
    }
    static className = "excel__toolbar";

    prepare() {
        // this.initState(defaultStyles);
        // console.log(initialState.currentStyles);
        this.initState(initialState.currentStyles);
    }

    get template() {
        // console.log(this.state);
        return createToolbar(this.state);
    }
    toHTML() {
        return this.template;
    }

    storeChanged({ currentStyles }) {
        this.setState(currentStyles);
    }
    onClick(event) {
        // console.log("Toolbar: onClick", event.target.textContent);
        const $target = $(event.target);
        if ($target.data.type === "button") {
            const value = JSON.parse($target.data.value);
            this.$emit("toolbar:applyStyle", value);
            // const key = Object.keys(value)[0];
            // this.setState(value);
        }
    }
}