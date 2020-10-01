import { Excel } from "@/components/excel/Excel";
import { Header } from "@/components/header/Header";
import { Toolbar } from "@/components/toolbar/Toolbar";
import { Formula } from "@/components/formula/Formula";
import { Table } from "@/components/table/Table";
import Store from "@core/createStore";
import { rootReducer } from "./components/redux/rootReducer";
import { storage, debounce } from "@core/utils";
import "./scss/index.scss";
import { initialState } from "./components/redux/initialState";

const store = new Store(rootReducer, initialState);
const stateListener = debounce((state) => {
    console.log("Update state", state);
    storage("state", state);
}, 300);
store.subscribe(stateListener);
// window.store = store;
const excel = new Excel("#app", {
    components: [Header, Toolbar, Formula, Table],
    store
});
excel.render();