import { ExcelComponent } from "@core/ExcelComponent";
import { debounce } from "@core/utils";
import * as actions from "../redux/actions";


export class Header extends ExcelComponent {
    constructor($root, options) {
        super($root, {
            name: "Header",
            listeners: ["input"],
            subscribe: ["currentHeader"],
            ...options
        });
    }
    static className = "excel__header";
    prepare() {
        this.onInput = debounce(this.onInput, 300);
    }
    toHTML() {
        const value = this.store.getState().titleState;
        return `<input type="text" class="input" value="${value}">
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
        const header = event.target.value;
        this.$dispatch(actions.changeTitle(header));
    }
}