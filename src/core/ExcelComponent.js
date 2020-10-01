import DOMListener from "@core/DOMListener";
export class ExcelComponent extends DOMListener {
    constructor($root, options = {}) {
        super($root, options.listeners);
        this.name = options.name || "";
        this.emitter = options.emitter;
        this.store = options.store;
        this.subscribe = options.subscribe || [];
        this.unsubscribers = [];
        this.storeSub = null;
        this.prepare();
    }

    prepare() {

    }
    // return object template
    toHTML() {
        return "";
    }

    $dispatch(action) {
        this.store.dispatch(action);
    }

    // Сюда приходят изменения по тем полям, на которые мы подписаны
    storeChanged() {
    }

    isWatching(key) {
        return this.subscribe.includes(key);
    }

    // $subscribe(cb) {
    //     this.storeSub = this.store.subscribe(cb);
    // }

    $emit(event, ...args) {
        this.emitter.emit(event, ...args);
    }

    $on(event, fn) {
        const unsub = this.emitter.subscribe(event, fn);
        this.unsubscribers.push(unsub);
    }

    init() {
        this.initDOMListeners();
    }

    destroy() {
        this.removeDOMListeners();
        this.unsubscribers.forEach(unsub => unsub());
        this.storeSub.unsubscribe();
    }
}