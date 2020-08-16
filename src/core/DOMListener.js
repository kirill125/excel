import { capitalize } from "@core/utils";

export default class DOMListener {
    constructor($root, listeners = []) {
        if (!$root) {
            throw new Error("No $root provided for DOMListener");
        }
        this.$root = $root;
        console.log($root);
        this.listeners = listeners;
    }

    initDOMListeners() {
        console.log(this.listeners);
        this.listeners.forEach(listener => {
            const eventMethod = getMethodName(listener);
            if (!this[eventMethod]) {
                throw new Error(`No such method as ${eventMethod} in ${this.name} Component`);
            }
            this[eventMethod] = this[eventMethod].bind(this);
            this.$root.on(listener, this[eventMethod]);
        });
    }
    removeDOMListeners() {
        this.listeners.forEach(listener => {
            const eventMethod = getMethodName(listener);
            if (!this[eventMethod]) {
                throw new Error(`No such method as ${eventMethod} in ${this.name} Component`);
            }
            this.$root.off(listener, this[eventMethod]);
        });
        this.listeners = [];
        console.log(this.listeners);
    }
}

function getMethodName(eventName) {
    return "on" + capitalize(eventName);
}